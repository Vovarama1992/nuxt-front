import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { OrdersService } from './orders.service';
import { ObjectId } from 'mongodb';
import { ChangeStatusDTO } from './dtos/change-status.dto';
import { ChangeTrackNumberDTO } from './dtos/change-tn.dto';

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

  @Patch('order/status')
  async changeStatus(@Body() dto: ChangeStatusDTO) {
    await this.orderService.changeStatus(dto);
  }

  @Patch('order/track-number')
  async changeTrackNumber(@Body() dto: ChangeTrackNumberDTO) {
    await this.orderService.changeTrackNumber(dto);
  }
}
