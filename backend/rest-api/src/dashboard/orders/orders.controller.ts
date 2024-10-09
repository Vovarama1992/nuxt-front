import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { DashboardOrdersService } from './orders.service';
import { ObjectId } from 'mongodb';
import { ChangeStatusDTO } from './dtos/change-status.dto';
import { ChangeTrackNumberDTO } from './dtos/change-tn.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetOrderResponseDTO } from 'src/order/dtos/get-order.dto';

@ApiTags('Dashboard Orders')
@UseGuards(RolesGuard)
@Roles('admin')
@Controller('dashboard/orders')
export class DashboardOrdersController {
  constructor(private readonly orderService: DashboardOrdersService) {}

  @ApiOkResponse({ type: [ GetOrderResponseDTO ] })
  @Get('')
  getOrders() {
    return this.orderService.getOrders();
  }

  @ApiOkResponse({ type: GetOrderResponseDTO })
  @Get('order/:id')
  getOrder(@Param('id') id: string) {
    return this.orderService.getOrder(new ObjectId(id));
  }

  @ApiOkResponse({ type: Object })
  @Patch('order/status')
  async changeStatus(@Body() dto: ChangeStatusDTO) {
    await this.orderService.changeStatus(dto);
    return {};
  }

  @ApiOkResponse({ type: Object })
  @Patch('order/track-number')
  async changeTrackNumber(@Body() dto: ChangeTrackNumberDTO) {
    await this.orderService.changeTrackNumber(dto);
    return {};
  }
}
