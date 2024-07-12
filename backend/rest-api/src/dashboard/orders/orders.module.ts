import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { databaseProvider } from 'src/common/integrations/mongodb/mongodb.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, databaseProvider],
})
export class OrdersModule {}
