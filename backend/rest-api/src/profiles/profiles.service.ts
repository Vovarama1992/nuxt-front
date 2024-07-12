import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Collection, MongoClient, ObjectId, UpdateFilter } from 'mongodb';
import {
  Order,
  Product,
  Profile,
} from 'src/common/integrations/mongodb/mongodb.interfaces';
import { DB_CONNECTION } from 'src/common/integrations/mongodb/mongodb.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { CreateAddressDTO } from './dtos/create-address.dto';
import { CreateCardItemDTO } from './dtos/create-cart-item.dto';
import { DeleteCartItem } from './dtos/delete-cart-item.dto';
import { UpdateCartItem } from './dtos/update-cart-item.dto';
import { ClientBotService } from 'src/client-bot/client-bot.service';
import { InlineKeyboard } from 'grammy';

const { format } = new Intl.NumberFormat('ru', {
  style: 'currency',
  currency: 'RUB',
});

export const usePriceFormat = (price: number): string => format(price);

@Injectable()
export class ProfilesService {
  private Profiles: Collection<Profile>;
  private Orders: Collection<Order>;
  private Products: Collection<Product>;

  constructor(
    @Inject(DB_CONNECTION)
    private readonly mongodbService: MongoClient,
    private readonly clientBotService: ClientBotService,
  ) {
    this.Profiles = mongodbService.db('3hundred').collection('profiles');
    this.Orders = mongodbService.db('3hundred').collection('orders');
    this.Products = mongodbService.db('3hundred').collection('products');
  }

  async createOrder(dto: CreateOrderDTO, profileId: ObjectId) {
    const filterCriteria = dto.items.reduce((acc, product) => {
      if (!acc[product.product_id]) {
        acc[product.product_id] = [];
      }
      acc[product.product_id].push(new ObjectId(product.size_id));
      return acc;
    }, {});

    const items = await this.Products.find(
      {
        _id: {
          $in: Object.keys(filterCriteria).map((id) => new ObjectId(id)),
        },
      } as UpdateFilter<Product>,
      {
        projection: {
          _id: 1,
          discount: 1,
          title: 1,
          size_grid: 1,
          sizes: {
            $filter: {
              input: '$sizes',
              as: 'size',
              cond: {
                $in: [
                  '$$size._id',
                  { $literal: [].concat(...Object.values(filterCriteria)) },
                ],
              },
            },
          },
        },
      },
    ).toArray();

    const itmemss = [];

    dto.items.forEach((el) => {
      const product = items.find((i) => i._id.toString() === el.product_id);

      if (!product)
        throw new BadRequestException(
          'Не удалось найти товар: ' + el.product_id,
        );

      const size = product.sizes.find((i) => i._id.toString() === el.size_id);
      if (!size)
        throw new BadRequestException('Не удалось найти размер: ' + el.size_id);

      if (el.quantity > size.quantity)
        throw new BadRequestException('Доступно товара: ' + size.quantity);

      itmemss.push({
        product_id: product._id,
        product_title: product.title,
        size_grid: product.size_grid,
        size_id: size._id,
        size_title: size.title,
        price: size.price,
        quantity: el.quantity,
      });
    });

    if (itmemss.length === 0) {
      throw new BadRequestException('Ваша корзина пуста!');
    }

    let textOrder = '';
    itmemss.forEach(async (el) => {
      textOrder += '—*' + el.product_title + '*\n';
      textOrder +=
        el.size_title + ' ' + el.size_grid + ' x ' + el.quantity + '\n\n';

      await this.Products.updateOne(
        { _id: el.product_id },
        {
          $inc: {
            'sizes.$[elem].quantity': -el.quantity,
          },
        },
        { arrayFilters: [{ 'elem._id': el.size_id }] },
      );
    });

    const orderID = new ObjectId();
    // await this.Orders.insertOne({
    //   _id: orderID,
    //   created_at: new Date(),
    //   status: 'created',
    //   comment: dto.message || null,

    //   customer: {
    //     city: dto.city,
    //     address: dto.address,
    //     first_name: dto.first_name,
    //     last_name: dto.last_name,
    //     surname: dto.surname || null,
    //     profile_id: profileId,
    //   },

    //   delivery_details: {
    //     delivery_method: dto.delivery_method,
    //   },

    //   payment_details: {
    //     promo_code: dto.promo_code || null,
    //     amount: itmemss.reduce((acc, el) => (acc += el.price * el.quantity), 0),
    //   },

    //   items: itmemss,

    //   history: [],

    //   chat: {
    //     message_quantity: 0,
    //     messages: [],
    //   },
    // });

    const profile = await this.Profiles.findOne(
      { _id: profileId },
      {
        projection: {
          _id: 0,
          telegram_id: 1,
        },
      },
    );

    await this.Profiles.updateOne(
      { _id: profileId },
      {
        $set: {
          cart: [],
        },
      },
    );

    await this.clientBotService.getBot().api.sendMessage(
      profile.telegram_id.toString(),
      `
🎊 Ваш заказ успешно сформирован!

❗️ Чтобы оплатить заказ вам надо связаться с менеджером и предоставить идентификатор заказа

*ID Заказа*: \`${orderID.toString()}\`

${textOrder}
Итоговая цена — ${usePriceFormat(itmemss.reduce((acc, el) => (acc += el.price * el.quantity), 0))}
    `,
      {
        parse_mode: 'Markdown',
        reply_markup: InlineKeyboard.from([
          [InlineKeyboard.url('Менеджер', 'https://t.me/noflours1')],
        ]),
      },
    );
  }

  async getName(id: ObjectId) {
    const { telegram_id } = await this.Profiles.findOne(
      { _id: id },
      {
        projection: {
          telegram_id: 1,
        },
      },
    );

    const chat = await this.clientBotService
      .getBot()
      .api.getChat(parseInt(telegram_id.toString()));

    return chat.username || chat.first_name + chat.last_name;
  }

  async getAddresses(profileId: ObjectId) {
    return await this.Profiles.findOne(
      { _id: profileId },
      {
        projection: {
          addresses: 1,
        },
      },
    );
  }

  async createAddress(dto: CreateAddressDTO, profileId: ObjectId) {
    await this.Profiles.updateOne(
      { _id: profileId },
      {
        $push: {
          addresses: {
            city: dto.city,
            address: dto.address,
          },
        },
      },
    );
  }

  async getCart(profileId: ObjectId) {
    return await this.Profiles.findOne(
      { _id: profileId },
      {
        projection: {
          cart: 1,
        },
      },
    );
  }

  async createCartItem(dto: CreateCardItemDTO, profileId: ObjectId) {
    await this.Profiles.updateOne(
      { _id: profileId },
      {
        $push: {
          cart: {
            product_id: new ObjectId(dto.product_id),
            size_id: new ObjectId(dto.size_id),
            quantity: dto.quantity,
          },
        } as UpdateFilter<Profile>,
      },
    );
  }

  async deleteCartItem(dto: DeleteCartItem, profileId: ObjectId) {
    await this.Profiles.updateOne(
      { _id: profileId },
      {
        $pull: {
          cart: {
            product_id: new ObjectId(dto.product_id),
            size_id: new ObjectId(dto.size_id),
          },
        },
      },
    );
  }

  async updateCartItem(dto: UpdateCartItem, profileId: ObjectId) {
    await this.Profiles.updateOne(
      { _id: profileId },
      {
        $inc: {
          'cart.$[elem].quantity': dto.quantity,
        },
      },
      {
        arrayFilters: [
          {
            'elem.product_id': new ObjectId(dto.product_id),
            'elem.size_id': new ObjectId(dto.size_id),
          },
        ],
      },
    );
  }

  async getFavorites(profileId: ObjectId) {
    return await this.Profiles.findOne(
      { _id: profileId },
      {
        projection: {
          favourites: 1,
        },
      },
    );
  }

  async createFavorites(productId: ObjectId, profileId: ObjectId) {
    return await this.Profiles.updateOne(
      { _id: profileId },
      {
        $push: {
          favourites: productId,
        },
      },
    );
  }

  async deleteFavorites(productId: ObjectId, profileId: ObjectId) {
    return await this.Profiles.updateOne(
      { _id: profileId },
      {
        $pull: {
          favourites: productId,
        },
      },
    );
  }

  async getScores(profileId: ObjectId) {
    return await this.Profiles.findOne(
      { _id: profileId },
      {
        projection: {
          'scores.quantity': 1,
        },
      },
    );
  }

  async getScoresHistory(profileId: ObjectId) {
    return await this.Profiles.findOne(
      { _id: profileId },
      {
        projection: {
          scores: 1,
          promocode: 1,
        },
      },
    );
  }

  async getOrders(profileId: ObjectId) {
    // db.products.find(
    //   {
    //     title: {
    //       $in: [
    //         'Adidas Originals AdiForm Superstar',
    //         'Nike Air Jordan 1 High OG "Taxi"',
    //         'New Balance 2002R "Gore-Tex JJJJound Charcoal"',
    //         'Nike Air Jordan 1 Low OG “Dark Smoke Grey”',
    //         'Asics Actibreeze 3D',
    //         'Nike Air Jordan 1 Mid SE "White Ice Blue"',
    //         'Nike Air Force 1 Low x NOCTA Certified Lover Boy',
    //         'Nike Dunk SB Low Pro “Black Gum”',
    //         'New Balance 2002R Protection Pack',
    //         'Nike Dunk Low Ocean',
    //       ],
    //     },
    //   },
    //   { projection: { _id: 1 } },
    // ).toArray();
    return await this.Orders.aggregate([
      { $match: { 'customer.profile_id': profileId } },
      {
        $lookup: {
          from: 'products',
          localField: 'items.product_id',
          foreignField: '_id',
          as: 'items',
        },
      },
      {
        $project: {
          created_at: 1,
          status: 1,
          payment_details: 1,
          delivery_details: 1,
          total_amount: 1,
          total_amount_promocode: 1,
          items: {
            preview: 1,
            'package.weight': 1,
          },
        },
      },
    ]).toArray();
  }

  async getOrder(profileId: ObjectId) {
    return await this.Orders.findOne({ _id: profileId });
  }
}
