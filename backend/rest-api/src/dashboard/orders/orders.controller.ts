import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { OrdersService } from './orders.service';
import { ObjectId } from 'mongodb';

@UseGuards(RolesGuard)
@Roles('admin')
@Controller('dashboard/orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get('')
  async getOrders() {
    return await this.orderService.getOrders();
  }

  @Get('order/:id')
  async getOrder(@Param('id') id: string) {
    return await this.orderService.getOrder(new ObjectId(id));
  }
}
