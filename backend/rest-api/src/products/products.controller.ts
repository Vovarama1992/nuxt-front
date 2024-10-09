import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { GetProductDTO, GetProductsResponseDTO } from './dtos/get-product.dto';
import { ProductsService } from './products.service';
import { ObjectId } from 'mongodb';
import { GetProductsGroupDTO } from './dtos/product-by-ids.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CollectionResponseDTO } from './dtos/collection.dto';
import { VariableGroupResponseDTO } from './dtos/variable.dto';
import { FiltersResponseDTO } from './dtos/filters.dto';
import { PartialProductResponseDTO, ProductResponseDTO } from './dtos/product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOkResponse({
    type: [ CollectionResponseDTO ]
  })
  @Get('/collections')
  getCollections() {
    return this.productsService.getCollections();
  }

  @ApiOkResponse({
    type: [ VariableGroupResponseDTO ]
  })
  @Get('/vars')
  getVars() {
    return this.productsService.getVars();
  }

  @ApiOkResponse({
    type: FiltersResponseDTO
  })
  @Get('/filters')
  getFilters(@Query() dto: GetProductDTO) {
    return this.productsService.getFilters(dto);
  }

  @ApiOkResponse({ type: GetProductsResponseDTO })
  @Get('/')
  getProducts(@Query() dto: GetProductDTO) {
    return this.productsService.getProducts(dto);
  }

  @ApiOkResponse({ type: [ PartialProductResponseDTO ] })
  @Get('/group')
  getProductsGroup(@Query() dto: GetProductsGroupDTO) {
    return this.productsService.getProductsGroup(dto);
  }

  @ApiOkResponse({ type: ProductResponseDTO })
  @Get('/:id')
  getProduct(@Param('id') _id: string) {
    return this.productsService.getProduct(new ObjectId(_id));
  }
}
