import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { GetProductDTO } from './dtos/get-product.dto';
import { ProductsService } from './products.service';
import { ObjectId } from 'mongodb';
import {
  GetProductsGroupDTO,
  ProductByIdsDTO,
} from './dtos/product-by-ids.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/collections')
  async getCollections() {
    return await this.productsService.getCollections();
  }

  @Get('/vars')
  async getVars() {
    return await this.productsService.getVars();
  }

  @Get('/filters')
  async getFilters(
    @Query() dto: GetProductDTO
  ) {
    return await this.productsService.getFilters(dto);
  }

  @Get('/page/:page')
  async getProducts(
    @Query() dto: GetProductDTO,
    @Param('page', ParseIntPipe) page: number,
  ) {
    return await this.productsService.getProducts(page, dto);
  }

  @Get('/:id')
  async getProduct(@Param('id') _id: string) {
    return await this.productsService.getProduct(new ObjectId(_id));
  }

  @Post('')
  async getProductByIds(@Body() dto: ProductByIdsDTO) {
    return await this.productsService.getProductsByIds(dto);
  }

  @Post('/group')
  async getProductsGroup(@Body() dto: GetProductsGroupDTO) {
    return await this.productsService.getProductsGroup(dto);
  }
}
