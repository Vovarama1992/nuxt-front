import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { CreateProductSizeDTO } from './dtos/create-product-size.dto';
import { CreateProductPhotoDTO } from './dtos/create-product-photo.dto';
import { CreateProductSimilarDTO } from './dtos/create-product-similar.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { DeleteProductDTO } from './dtos/delete-product.dto';
import { UpdateProductSizeDTO } from './dtos/update-product-size.dto';
import { DeleteProductSizeDTO } from './dtos/delete-product-size.dto';
import { GetProductsQueryParams } from './dtos/get-products-query.dto';

@Controller('dashboard/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('')
  async getProducts(@Query() quearyParams: GetProductsQueryParams) {
    await this.productsService.getProducts(quearyParams);
  }

  @Get(':id')
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    await this.productsService.getProduct(id);
  }

  @Post('')
  @HttpCode(HttpStatus.NO_CONTENT)
  createProduct(@Body() dto: CreateProductDTO) {
    this.productsService.createProduct(dto);
  }

  @Patch('')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateProduct(@Body() dto: UpdateProductDTO) {
    this.productsService.updateProduct(dto);
  }

  @Delete('')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteProduct(@Body() dto: DeleteProductDTO) {
    this.productsService.deleteProduct(dto);
  }

  @Post('size')
  @HttpCode(HttpStatus.NO_CONTENT)
  createProductSize(@Body() dto: CreateProductSizeDTO) {
    this.productsService.createProductSize(dto);
  }

  @Patch('size')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateProductSize(@Body() dto: UpdateProductSizeDTO) {
    this.productsService.updateProductSize(dto);
  }

  @Delete('size')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteProductSize(@Body() dto: DeleteProductSizeDTO) {
    this.productsService.deleteProductSize(dto);
  }

  @Post('photo')
  @HttpCode(HttpStatus.NO_CONTENT)
  createProductPhoto(@Body() dto: CreateProductPhotoDTO) {
    this.productsService.createProductPhoto(dto);
  }

  @Delete('photo')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteProductPhoto(@Body() dto: DeleteProductSizeDTO) {
    this.productsService.deleteProductPhoto(dto);
  }

  @Post('similar')
  @HttpCode(HttpStatus.NO_CONTENT)
  createProductSimilar(@Body() dto: CreateProductSimilarDTO) {
    this.productsService.createProductSimilar(dto);
  }

  @Delete('similar')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteProductSimilar(@Body() dto: DeleteProductDTO) {
    this.productsService.deleteProductSimilar(dto);
  }
}
