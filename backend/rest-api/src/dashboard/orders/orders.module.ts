import { Module } from '@nestjs/common';
import { DashboardOrdersController } from './orders.controller';
import { DashboardOrdersService } from './orders.service';
import { databaseProvider } from 'src/common/integrations/mongodb/mongodb.service';

@Module({
  controllers: [DashboardOrdersController],
  providers: [DashboardOrdersService, databaseProvider],
})
export class DashboardOrdersModule {}
