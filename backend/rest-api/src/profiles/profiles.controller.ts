import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { ProfilesService } from './profiles.service';
import { ObjectId } from 'mongodb';
import { CreateAddressDTO } from './dtos/create-address.dto';
import { CreateCardItemDTO } from './dtos/create-cart-item.dto';
import { DeleteCartItem } from './dtos/delete-cart-item.dto';
import { UpdateCartItem } from './dtos/update-cart-item.dto';
import { CreateFavoriteDTO } from './dtos/create-favorite.dto';

@Controller('profile')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @Get('cart')
  async getCart(@Req() req) {
    return await this.profilesService.getCart(
      new ObjectId(req?.profile.profileId),
    );
  }

  @Get('info/name/:id')
  async getName(@Param('id') id: string) {
    return {
      name: await this.profilesService.getName(new ObjectId(id))
    };
  }

  @Get('info/avatar/:id')
  async getAvatar(@Param('id') id: string) {
    const buffer = await this.profilesService.getAvatar(new ObjectId(id));
    return new StreamableFile(buffer, {
      type: 'image/jpeg'
    });
  }

  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @Post('cart')
  async createCartItem(@Body() dto: CreateCardItemDTO, @Req() req) {
    return await this.profilesService.createCartItem(
      dto,
      new ObjectId(req?.profile.profileId),
    );
  }

  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @Delete('cart')
  async deleteCartItem(@Body() dto: DeleteCartItem, @Req() req) {
    return await this.profilesService.deleteCartItem(
      dto,
      new ObjectId(req?.profile.profileId),
    );
  }

  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @Patch('cart')
  async updateCartItem(@Body() dto: UpdateCartItem, @Req() req) {
    return await this.profilesService.updateCartItem(
      dto,
      new ObjectId(req?.profile.profileId),
    );
  }

  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @Get('favorites')
  async getFavorites(@Req() req) {
    return await this.profilesService.getFavorites(
      new ObjectId(req?.profile.profileId),
    );
  }

  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @Post('favorites')
  async createFavorites(@Body() dto: CreateFavoriteDTO, @Req() req) {
    return await this.profilesService.createFavorites(
      new ObjectId(dto.product_id),
      new ObjectId(req?.profile.profileId),
    );
  }

  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @Delete('favorites')
  async deleteFavorites(@Body() dto: CreateFavoriteDTO, @Req() req) {
    return await this.profilesService.deleteFavorites(
      new ObjectId(dto.product_id),
      new ObjectId(req?.profile.profileId),
    );
  }

  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @Get('scores')
  async getScores(@Req() req) {
    return await this.profilesService.getScores(
      new ObjectId(req.profile.profileId),
    );
  }

  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @Get('scores-history')
  async getScoresHistory(@Req() req) {
    return await this.profilesService.getScores(
      new ObjectId(req.profile.profileId),
    );
  }

  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @Post('order')
  async createOrder(@Body() dto: CreateOrderDTO, @Req() req) {
    await this.profilesService.createOrder(
      dto,
      new ObjectId(req?.profile.profileId),
    );
  }

  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @Post('address')
  async createAddress(@Body() dto: CreateAddressDTO, @Req() req) {
    await this.profilesService.createAddress(
      dto,
      new ObjectId(req?.profile.profileId),
    );
  }

  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @Get('addresses')
  async getAddresses(@Req() req) {
    return await this.profilesService.getAddresses(
      new ObjectId(req?.profile.profileId),
    );
  }

  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @Get('orders')
  async getOrders(@Req() req) {
    return await this.profilesService.getOrders(
      new ObjectId(req?.profile.profileId),
    );
  }

  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @Get('order')
  async getOrder(@Req() req) {
    return await this.profilesService.getOrder(
      new ObjectId(req?.profile.profileId),
    );
  }
}
