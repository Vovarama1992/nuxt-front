import {
  Body,
  Controller,
  NotFoundException,
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
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { PromocodeResponseDTO } from './dtos/promocode.dto';
import { GetOrderResponseDTO } from './dtos/get-order.dto';
import { PartialDocumentDTO } from 'src/common/utils/default';

@ApiTags('Order')
@Roles('user', 'admin')
@UseGuards(RolesGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOkResponse({ type: PromocodeResponseDTO })
  @Get('promocode/:id')
  async getPromocode(@Param('id') promocode: string) {
    // @Req() req
    // new ObjectId(req?.profile.profileId),
    return await this.orderService.getPromocode(promocode);
  }

  @ApiOkResponse({ type: GetOrderResponseDTO })
  @Get(':id')
  async getOrder(@Param('id') orderId: string, @Req() req) {
    const order = this.orderService.getOrder(
      new ObjectId(req.profile?.profileId),
      new ObjectId(orderId),
    );

    if (!order)
      throw new NotFoundException();

    return order;
  }

  @ApiOkResponse({ type: [ GetOrderResponseDTO ] })
  @Get('')
  getAll(@Req() req) {
    return this.orderService.getAll(
      new ObjectId(req.profile?.profileId)
    );
  }

  @ApiOkResponse({ type: PartialDocumentDTO })
  @Post('')
  async createOrder(@Body() dto: CreateOrderDTO, @Req() req) {
    const insertedId = await this.orderService.createOrder(
      new ObjectId(req?.profile.profileId),
      dto,
    );

    return { _id: insertedId };
  }
}
