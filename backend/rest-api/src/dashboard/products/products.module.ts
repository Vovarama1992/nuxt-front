import { Module } from '@nestjs/common';
import { DashboardProductsController } from './products.controller';
import { DashboardProductsService } from './products.service';
import { databaseProvider } from 'src/common/integrations/mongodb/mongodb.service';

@Module({
  imports: [],
  controllers: [DashboardProductsController],
  providers: [DashboardProductsService, databaseProvider],
})
export class ProductsModule {}
