import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { databaseProvider } from 'src/common/integrations/mongodb/mongodb.service';
import { ClientBotModule } from 'src/client-bot/client-bot.module';

@Module({
  imports: [ClientBotModule],
  providers: [OrderService, databaseProvider],
  controllers: [OrderController],
})
export class OrderModule {}
