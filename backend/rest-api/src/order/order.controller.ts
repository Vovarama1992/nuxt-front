import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { ObjectId } from 'mongodb';

@Roles('user', 'admin')
@UseGuards(RolesGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('promocde')
  async getPromocode(@Query('promocode') promocode: string) {
    // @Req() req
    // new ObjectId(req?.profile.profileId),
    return await this.orderService.getPromocode(promocode);
  }

  @Get(':id')
  async getOrder(@Param('id') orderId: string, @Req() req) {
    return this.orderService.getOrder(
      new ObjectId(req.profile?.profileId),
      new ObjectId(orderId),
    );
  }

  @Post('')
  async createOrder(@Body() dto: CreateOrderDTO, @Req() req) {
    return await this.orderService.creteOrder(
      new ObjectId(req?.profile.profileId),
      dto,
    );
  }
}
