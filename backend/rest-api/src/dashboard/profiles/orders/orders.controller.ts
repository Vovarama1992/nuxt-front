import { Controller, Get, Post } from '@nestjs/common';

@Controller(':profile_id/orders')
export class OrdersController {
  @Get('')
  async getOrders() {
    return false;
  }

  @Get(':id')
  async getOrder() {
    return false;
  }

  @Post(':id/cancle')
  async cancle() {
    return false;
  }

  @Post(':id/approval')
  async approval() {
    return false;
  }
}
