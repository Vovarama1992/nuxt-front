import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Collection, MongoClient, ObjectId } from 'mongodb';
import {
  Order,
  Product,
  Profile,
  Promocode,
} from 'src/common/integrations/mongodb/mongodb.interfaces';
import { DB_CONNECTION } from 'src/common/integrations/mongodb/mongodb.service';
import { CreateOrderDTO, ProductDTO } from './dtos/create-order.dto';
import { ClientBotService } from 'src/client-bot/client-bot.service';
import { InlineKeyboard } from 'grammy';

const { format } = new Intl.NumberFormat('ru', {
  style: 'currency',
  currency: 'RUB',
});

@Injectable()
export class OrderService {
  private Profiles: Collection<Profile>;
  private Promocodes: Collection<Promocode>;
  private Products: Collection<Product>;
  private Orders: Collection<Order>;

  constructor(
    @Inject(DB_CONNECTION)
    private readonly mongodbService: MongoClient,
    private readonly clientBotService: ClientBotService,
  ) {
    this.Profiles = mongodbService.db('3hundred').collection('profiles');
    this.Promocodes = mongodbService.db('3hundred').collection('promocodes');
    this.Products = mongodbService.db('3hundred').collection('products');
    this.Orders = mongodbService.db('3hundred').collection('orders');
  }

  async getPromocode(pcode: string) {
    const promocode: {
      discount?: number;
      price?: number;
      partner?: string;
      type?: 'discount' | 'price';
    } = {};

    let result: any = await this.Promocodes.findOne({ code: pcode });

    if (!result) {
      result = await this.Profiles.findOne(
        { promocode: pcode },
        {
          projection: {
            _id: 1,
          },
        },
      );

      if (!result)
        throw new NotFoundException();

      promocode.partner = result._id;
    } else {
      switch (true) {
        case !!result.discount:
          promocode.discount = result.discount;
          promocode.type = 'discount';
          break;
        case !!result.price:
          promocode.price = result.price;
          promocode.type = 'price';
          break;
      }
    }

    return promocode;
  }

  // Проверить товар [+ / -]
  // Зарезирвировать товар [+]
  // Проверить промокод
  // создать товар с учетом скидки
  // очистить корзину
  // оповестить польщователя
  // оповестить админа
  async creteOrder(profileId: ObjectId, dto: CreateOrderDTO) {
    const foundProducts = await this.checkProductsInOrder(dto);
    await this.reservation(foundProducts, dto);
    const promocode = dto.promocode
      ? await this.checkPromocode(profileId, dto.promocode)
      : null;

    const items: ProductDTO[] = [];
    let totalAmount = 0;

    if (!foundProducts?.length) {
      throw new InternalServerErrorException(
        'Скорее всего, что-то с вашим товаром! Пожалуйста, пересоберите корзину',
      );
    }

    for (const fProduct of foundProducts) {
      for (const fSize of fProduct.sizes) {
        items.push({
          product_id: fProduct._id,
          product_title: fProduct.title,
          product_type: fProduct.type,
          product_brand: fProduct.brand,
          product_size_grid: fProduct.size_grid,
          size_id: fSize._id,
          size_title: fSize.title,
          size_price: fSize.price,
          quantity: dto.products.find(
            (el) => el.size_id === fSize._id?.toString(),
          ).quantity,
        });

        let productAmount = fSize.price;
        productAmount -= (productAmount / 100) * fProduct.discount;
        productAmount *= dto.products.find((el) => el.size_id === fSize._id?.toString())
          .quantity || 1;

        totalAmount += productAmount;
      }
    }

    let totalAmountPromocode = totalAmount;

    if (promocode) {
      if (promocode.type === 'price') {
        totalAmountPromocode -= promocode.price;
      }

      if (promocode.type === 'discount') {
        totalAmountPromocode -=
          (totalAmountPromocode / 100) * promocode.discount;
      }
    }

    const { insertedId } = await this.Orders.insertOne({
      _id: new ObjectId(),
      created_at: new Date(),
      total_amount: totalAmount,
      total_amount_promocode: totalAmountPromocode,
      customer: {
        city: dto.delivery_address.city,
        address: dto.delivery_address.address,
        postal_code: dto.postal_code,
        phone_number: dto.phone_number,
        pvz: dto.pvz,
        profile_id: profileId,
        first_name: dto.first_name,
        last_name: dto.last_name,
        surname: dto.surname || '',
      },
      delivery_details: {
        delivery_method: dto.delivery_method,
      },
      history: [],
      payment_details: {
        promo_code: dto.promocode,
      },
      comment: dto.message,
      status: 'created',
      items: items,
      chat: {
        message_quantity: 0,
        messages: [],
      },
    });

    let textOrder = '';
    items.forEach(async (el) => {
      textOrder += '—*' + el.product_title + '*\n';
      textOrder +=
        el.size_title +
        ' ' +
        el.product_size_grid +
        ' x ' +
        el.quantity +
        '\n\n';
    });

    const user = await this.Profiles.findOne(
      { _id: profileId },
      {
        projection: {
          telegram_id: 1,
        },
      },
    );

    if (user && user.telegram_id) {
      await this.clientBotService.getBot().api.sendMessage(
        user.telegram_id.toString(),
        `
        🎊 Ваш заказ успешно сформирован!

        ❗️ Чтобы оплатить заказ вам надо связаться с менеджером и предоставить идентификатор заказа

        *ID Заказа*: \`${insertedId.toString()}\`

        ${textOrder}
        Итоговая цена — ${format(totalAmountPromocode || totalAmount)}
        `.replaceAll('\t', ''),
        {
          parse_mode: 'Markdown',
          reply_markup: InlineKeyboard.from([
            [InlineKeyboard.url('Менеджер', 'https://t.me/noflours1')],
          ]),
        },
      );
    }

    return insertedId;
  }

  async getOrder(profileId: ObjectId, orderId: ObjectId) {
    const order = await this.Orders.aggregate([
      { $match: { 'customer.profile_id': profileId, _id: orderId } },
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.product_id',
          foreignField: '_id',
          as: 'fetchedProduct'
        }
      },
      { $unwind: '$fetchedProduct' },
      {
        $project: {
          items: {
            product_id: 0,
            product_title: 0,
            product_type: 0,
            product_brand: 0,
            product_size_grid: 0,
          }
        }
      },
      { $addFields: { 'items.product': '$fetchedProduct' } },
      {
        $group: {
          _id: '$_id',
          created_at: { $first: '$created_at' },
          status: { $first: '$status' },
          customer: { $first: '$customer' },
          payment_details: { $first: '$payment_details' },
          delivery_details: { $first: '$delivery_details' },
          total_amount: { $first: '$total_amount' },
          total_amount_promocode: { $first: '$total_amount_promocode' },
          items: { $push: '$items' }
        },
      },
    ]).toArray();
    if (order[0].delivery_details?.trak_number) {
      try {
        const result = await fetch('https://www.cdek.ru/api-site/v1/graphql/', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            query:
              '\nquery getTrackingInfo(\n  $trackId: String!\n  $phone: String\n  $locale: String!\n  $token: String\n) {\n  tracking: trackingInfo(\n    trackId: $trackId\n    phone: $phone\n    locale: $locale\n    token: $token\n  ) {\n    success\n    orderNumber\n    status {\n      code\n      name\n      note\n      date\n    }\n    statuses {\n      code\n      name\n      note\n      date\n      completed\n      items {\n        code\n        name\n        statuses {\n            code\n            name\n            date\n        }\n      }\n    }\n    cityFrom {\n      code\n      name\n    }\n    cityTo {\n      code\n      name\n    }\n    orderDate\n    tariffDateEnd\n    storageDateEnd\n    deliveryAgreementDate\n    returnOrderNumber\n    weight\n    stockType\n    receiver {\n        initials\n        address {\n            title\n            city {\n                code\n                name\n            }\n            office {\n                systemName\n                type\n                worktime\n                notes\n            }\n        }\n    }\n    notes {\n        code\n        name\n    }\n    nonDeliveryNote {\n        code\n        name\n    }\n    errors {\n      message\n      code\n    }\n    specialNote\n    canBeReturned\n  }\n}\n',
            variables: {
              trackId: order[0].delivery_details?.trak_number,
              locale: 'ru',
              token: null,
            },
            context: {
              enabledGlobalError: false,
            },
          }),
        });
        const json = await result.json();
        order[0]['statuses'] = json.data.tracking.statuses;
      } catch (err) {}
    }

    return order;
  }

  private async checkProductsInOrder(dto: CreateOrderDTO) {
    const pipeline = [
      {
        $match: {
          $or: dto.products.map((el) => ({
            _id: new ObjectId(el.product_id),
            sizes: {
              $elemMatch: {
                _id: new ObjectId(el.size_id),
                quantity: { $gte: el.quantity },
              },
            },
          })),
        },
      },
      {
        $unwind: '$sizes',
      },
      {
        $match: {
          $or: dto.products.map((el) => ({
            'sizes._id': new ObjectId(el.size_id),
            'sizes.quantity': { $gte: el.quantity },
          })),
        },
      },
      {
        $group: {
          _id: '$_id',
          type: { $first: '$type' },
          brand: { $first: '$brand' },
          title: { $first: '$title' },
          size_grid: { $first: '$size_grid' },
          discount: { $first: '$discount' },
          sizes: {
            $push: {
              _id: '$sizes._id',
              title: '$sizes.title',
              price: '$sizes.price',
              quantity: '$sizes.quantity',
            },
          },
        },
      },
    ];

    return await this.Products.aggregate(pipeline).toArray();
  }

  private async reservation(products: any, dto: CreateOrderDTO) {
    const updateOperations = [];

    for (const product of products) {
      for (const size of product.sizes) {
        const dtoProduct = dto.products.find((el) => {
          return el.size_id === size._id.toString();
        });

        if (!dtoProduct) continue;

        updateOperations.push(
          this.Products.updateOne(
            { 'sizes._id': new ObjectId(size._id) },
            {
              $inc: {
                'sizes.$[elem].quantity': -dtoProduct.quantity,
              },
            },
            {
              arrayFilters: [{ 'elem._id': new ObjectId(size._id) }],
            },
          ),
        );
      }
    }

    try {
      await Promise.all(updateOperations);
    } catch (error) {
      console.error('Ошибка при обновлении продуктов:', error);
      throw new Error('Ошибка при резервировании продуктов');
    }
  }

  private async checkPromocode(profileId: ObjectId, promocode: string) {
    const otherProfile = await this.Profiles.findOne(
      { promocode },
      {
        projection: {
          _id: 1,
        },
      },
    );

    if (otherProfile) {
      return {
        type: 'ball',
        quantity: 500,
        otherProfile: otherProfile._id,
      };
    }

    const result = await this.Promocodes.findOne({
      code: promocode,
      quantity: { $gte: 1 },
    });

    if (result) {
      if (result.discount) {
        await this.Promocodes.updateOne(
          { code: promocode },
          {
            $inc: { quantity: -1 },
          },
        );

        return {
          type: 'discount',
          discount: result.discount,
        };
      }

      if (result.price) {
        await this.Promocodes.updateOne(
          { code: promocode },
          {
            $inc: { quantity: -1 },
          },
        );

        return {
          type: 'price',
          price: result.price,
        };
      }
    }

    return null;
  }
}
