import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Collection, MongoClient, ObjectId, UpdateFilter } from 'mongodb';
import {
  Order,
  Product,
  Profile,
} from 'src/common/integrations/mongodb/mongodb.interfaces';
import { DB_CONNECTION } from 'src/common/integrations/mongodb/mongodb.service';
import { AddressDTO } from './dtos/address.dto';
import { CartItemDTO, DeleteCartItem, UpdateCartItem } from './dtos/cart.dto';
import { ClientBotService } from 'src/client-bot/client-bot.service';
import { InlineKeyboard } from 'grammy';

const { format } = new Intl.NumberFormat('ru', {
  style: 'currency',
  currency: 'RUB',
});

export const usePriceFormat = (price: number): string => format(price);

const PROFILE_PICTURE_MAX_AGE = 60 * 60 * 1000;

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

  async getName(id: ObjectId) {
    const profile = await this.Profiles.findOne(
      { _id: id },
      {
        projection: {
          telegram_id: 1,
        },
      },
    );

    if (!profile)
      return null;

    const chat = await this.clientBotService
      .getBot()
      .api.getChat(Number(profile.telegram_id));

    return chat.username || chat.first_name + chat.last_name;
  }

  // XXX: later download avatar from Telegram and serve it from the disk instead!
  // this currently serves as a mirror from Telegram to the website, but Figma mockups
  // show that there is an edit button for the avatar
  async getAvatar(id: ObjectId, force = false) {
    const profile = await this.Profiles.findOne(
      { _id: id },
      {
        projection: {
          telegram_id: 1,
          profile_picture: 1,
          last_fetched_profile_picture: 1
        },
      },
    );
    if (!profile)
      return null;

    const now = Date.now();
    let url = profile.profile_picture;
    if (force || !profile.last_fetched_profile_picture || now - profile.last_fetched_profile_picture > PROFILE_PICTURE_MAX_AGE) {
      const bot = this.clientBotService.getBot();
      const profilePictures = await bot.api.getUserProfilePhotos(Number(profile.telegram_id));

      if (profilePictures.total_count === 0)
        return null;

      const profilePicture = profilePictures.photos[0];
      url = await this.clientBotService.getFileURL(profilePicture[0].file_id);

      await this.Profiles.updateOne(
        { _id: id },
        {
          $set: {
            profile_picture: url,
            last_fetched_profile_picture: now
          }
        }
      );
    }

    try {
      const response = await fetch(url);
      return Buffer.from(await response.arrayBuffer());
    } catch (err) {
      if (force)
        return null;

      return this.getAvatar(id, true);
    }
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

  async createAddress(dto: AddressDTO, profileId: ObjectId) {
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

  async createCartItem(dto: CartItemDTO, profileId: ObjectId) {
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
    await this.Profiles.updateOne(
      { _id: profileId },
      {
        $push: {
          favourites: productId,
        },
      },
    );
  }

  async deleteFavorites(productId: ObjectId, profileId: ObjectId) {
    await this.Profiles.updateOne(
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
          promocode: 1,
          scores: 1,
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
