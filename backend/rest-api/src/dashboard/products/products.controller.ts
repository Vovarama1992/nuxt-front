import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DashboardProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { DeleteProductDTO } from './dtos/delete-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { ObjectId } from 'mongodb';
import { CreateSizeDTO } from './dtos/create-size.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Dashboard Products')
@Controller('dashboard/products')
export class DashboardProductsController {
  constructor(private readonly productsService: DashboardProductsService) {}

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('')
  async getProducts(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.productsService.getProducts(page, limit);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post('')
  async createProduct(@Body() dto: CreateProductDTO) {
    return {
      product_id: await this.productsService.createProduct(dto),
    };
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post('size')
  async createProductSize(@Body() dto: CreateSizeDTO) {
    await this.productsService.createProductSize(dto);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch('')
  async updateProduct(@Body() dto: UpdateProductDTO) {
    await this.productsService.updateProduct(dto);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete('')
  async deleteProduct(@Body() dto: DeleteProductDTO) {
    await this.productsService.deleteProduct(dto);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get(':id')
  async getProduct(@Param('id') productId: string) {
    return await this.productsService.getProduct(new ObjectId(productId));
  }

  @Post('photo')
  @UseInterceptors(FileInterceptor('file'))
  async createPhoto(@UploadedFile() file: Express.Multer.File) {
    await this.productsService.saveImage(file);

    return {
      title: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    };
  }
}
