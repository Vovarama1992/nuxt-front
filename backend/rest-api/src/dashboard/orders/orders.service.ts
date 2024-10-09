import { Inject, Injectable } from '@nestjs/common';
import { Collection, MongoClient, ObjectId } from 'mongodb';
import { Order } from 'src/common/integrations/mongodb/mongodb.interfaces';
import { DB_CONNECTION } from 'src/common/integrations/mongodb/mongodb.service';
import { ChangeStatusDTO } from './dtos/change-status.dto';
import { ChangeTrackNumberDTO } from './dtos/change-tn.dto';

@Injectable()
export class DashboardOrdersService {
  private Orders: Collection<Order>;

  constructor(
    @Inject(DB_CONNECTION) private readonly mongodbService: MongoClient,
  ) {
    this.Orders = mongodbService.db('3hundred').collection('orders');
  }

  getOrders() {
    return this.Orders.find({}).toArray();
  }

  getOrder(id: ObjectId) {
    return this.Orders.findOne({
      _id: id,
    });
  }

  changeStatus(dto: ChangeStatusDTO) {
    return this.Orders.updateOne(
      { _id: new ObjectId(dto.order_id) },
      {
        $set: {
          status: dto.status,
        },
      },
    );
  }

  changeTrackNumber(dto: ChangeTrackNumberDTO) {
    return this.Orders.updateOne(
      { _id: new ObjectId(dto.order_id) },
      {
        $set: {
          'delivery_details.trak_number': dto.track_number,
        },
      },
    );
  }
}
