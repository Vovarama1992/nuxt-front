import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ProfilesService } from './profiles.service';
import { ObjectId } from 'mongodb';
import { AddressDTO, AddressesDTO } from './dtos/address.dto';
import { CartItemDTO, DeleteCartItem, GetCartResponseDTO, UpdateCartItem } from './dtos/cart.dto';
import { ApiOkResponse, ApiProduces, ApiTags } from '@nestjs/swagger';
import { GetNameResponseDTO } from './dtos/get-name.dto';
import { CreateFavoriteDTO, FavoritesResponseDTO } from './dtos/favorites.dto';
import { PartialDocumentDTO } from 'src/common/utils/default';
import { ScoresResponseDTO } from './dtos/scores.dto';

@ApiTags('Profile')
@Controller('profile')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @ApiOkResponse({ type: GetCartResponseDTO })
  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @Get('cart')
  getCart(@Req() req) {
    return this.profilesService.getCart(
      new ObjectId(req?.profile.profileId),
    );
  }

  @ApiOkResponse({ type: GetNameResponseDTO })
  @Get('info/name/:id')
  async getName(@Param('id') id: string) {
    const name = await this.profilesService.getName(new ObjectId(id));

    if (!name)
      throw new NotFoundException();

    return { name };
  }

  @ApiOkResponse({
    schema: {
      type: 'string',
      format: 'binary'
    }
  })
  @ApiProduces('image/jpeg')
  @Get('info/avatar/:id')
  async getAvatar(@Param('id') id: string) {
    const buffer = await this.profilesService.getAvatar(new ObjectId(id));

    if (!buffer)
      throw new NotFoundException();

    return new StreamableFile(buffer, {
      type: 'image/jpeg'
    });
  }

  @ApiOkResponse({})
  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @Post('cart')
  createCartItem(@Body() dto: CartItemDTO, @Req() req) {
    return this.profilesService.createCartItem(
      dto,
      new ObjectId(req?.profile.profileId),
    );
  }

  @ApiOkResponse({})
  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @Delete('cart')
  deleteCartItem(@Body() dto: DeleteCartItem, @Req() req) {
    return this.profilesService.deleteCartItem(
      dto,
      new ObjectId(req?.profile.profileId),
    );
  }

  @ApiOkResponse({})
  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @Patch('cart')
  updateCartItem(@Body() dto: UpdateCartItem, @Req() req) {
    return this.profilesService.updateCartItem(
      dto,
      new ObjectId(req?.profile.profileId),
    );
  }

  @ApiOkResponse({ type: FavoritesResponseDTO })
  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @Get('favorites')
  getFavorites(@Req() req) {
    return this.profilesService.getFavorites(
      new ObjectId(req?.profile.profileId),
    );
  }

  @ApiOkResponse({})
  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @Post('favorites')
  createFavorites(@Body() dto: CreateFavoriteDTO, @Req() req) {
    return this.profilesService.createFavorites(
      new ObjectId(dto.product_id),
      new ObjectId(req?.profile.profileId),
    );
  }

  @ApiOkResponse({})
  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @Delete('favorites')
  deleteFavorites(@Body() dto: CreateFavoriteDTO, @Req() req) {
    return this.profilesService.deleteFavorites(
      new ObjectId(dto.product_id),
      new ObjectId(req?.profile.profileId),
    );
  }

  @ApiOkResponse({ type: ScoresResponseDTO })
  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @Get('scores')
  getScores(@Req() req) {
    return this.profilesService.getScores(
      new ObjectId(req.profile.profileId),
    );
  }

  @ApiOkResponse({})
  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @Post('address')
  createAddress(@Body() dto: AddressDTO, @Req() req) {
    return this.profilesService.createAddress(
      dto,
      new ObjectId(req?.profile.profileId),
    );
  }

  @ApiOkResponse({ type: AddressesDTO })
  @Roles('user', 'admin')
  @UseGuards(RolesGuard)
  @Get('address')
  getAddresses(@Req() req) {
    return this.profilesService.getAddresses(
      new ObjectId(req?.profile.profileId),
    );
  }
}
