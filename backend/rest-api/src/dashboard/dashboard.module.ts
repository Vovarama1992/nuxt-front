import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { DashboardOrdersModule } from './orders/orders.module';

@Module({
  imports: [ProductsModule, DashboardOrdersModule],
})
export class DashboardModule {}
