import { Inject, Injectable } from '@nestjs/common';
import { ProfileIdentifier } from './interfaces/repository.interfaces';
import { Collection, MongoClient, ObjectId, WithId } from 'mongodb';
import { DB_CONNECTION } from 'src/common/integrations/mongodb/mongodb.service';
import { Profile } from 'src/common/integrations/mongodb/mongodb.interfaces';

@Injectable()
export class RepositoryService {
  private Profiles: Collection<Profile>;

  constructor(
    @Inject(DB_CONNECTION) private readonly mongodbService: MongoClient,
  ) {
    this.Profiles = mongodbService.db('3hundred').collection('profiles');
  }

  async findProfile(
    id: ProfileIdentifier,
  ): Promise<{ _id: ObjectId; role: string }> {
    const arrSearch = [];

    if (id.phoneNumber) {
      arrSearch.push({ phone_number: id.phoneNumber });
    }

    if (id.telegramId) {
      arrSearch.push({ telegram_id: BigInt(id.telegramId) });
    }

    const profile: WithId<{ _id: ObjectId; role: string }> =
      await this.Profiles.findOne(
        {
          $or: arrSearch,
        },
        {
          projection: {
            _id: true,
            role: true,
          },
        },
      );

    return profile;
  }

  private generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  async createProfile(
    id: ProfileIdentifier,
  ): Promise<{ _id: ObjectId; role: string }> {
    const { insertedId } = await this.Profiles.insertOne({
      _id: new ObjectId(),
      telegram_id: BigInt(id.telegramId) || null,
      create_at: new Date(),
      phone_number: id.phoneNumber || null,
      role: 'user',
      addresses: [],
      promocode: this.generateRandomString(12),
      cart: [],
      favourites: [],
      orders: [],
      scores: {
        quantity: 0,
        history: [],
      },
    });

    return {
      _id: insertedId,
      role: 'user',
    };
  }
}
