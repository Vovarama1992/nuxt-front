import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { OrdersController } from './orders/orders.controller';
import { OrdersModule } from './orders/orders.module';
import { ChatsModule } from './chats/chats.module';

@Module({
  controllers: [ProfilesController, OrdersController],
  imports: [OrdersModule, ChatsModule],
})
export class ProfilesModule {}
