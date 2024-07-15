import { Inject, Injectable } from '@nestjs/common';
import { Collection, MongoClient, ObjectId } from 'mongodb';
import { Order } from 'src/common/integrations/mongodb/mongodb.interfaces';
import { DB_CONNECTION } from 'src/common/integrations/mongodb/mongodb.service';
import { ChangeStatusDTO } from './dtos/change-status.dto';
import { ChangeTrackNumberDTO } from './dtos/change-tn.dto';

@Injectable()
export class OrdersService {
  private Orders: Collection<Order>;

  constructor(
    @Inject(DB_CONNECTION) private readonly mongodbService: MongoClient,
  ) {
    this.Orders = mongodbService.db('3hundred').collection('orders');
  }

  async getOrders() {
    return await this.Orders.find(
      {},
      {
        projection: {
          created_at: 1,
          total_amount_promocode: 1,
          status: 1,
          customer: 1,
        },
      },
    ).toArray();
  }

  async getOrder(id: ObjectId) {
    return await this.Orders.findOne({
      _id: id,
    });
  }

  async changeStatus(dto: ChangeStatusDTO) {
    await this.Orders.updateOne(
      { _id: new ObjectId(dto.order_id) },
      {
        $set: {
          status: dto.status,
        },
      },
    );
  }

  async changeTrackNumber(dto: ChangeTrackNumberDTO) {
    await this.Orders.updateOne(
      { _id: new ObjectId(dto.order_id) },
      {
        $set: {
          'delivery_details.trak_number': dto.track_number,
        },
      },
    );
  }
}
