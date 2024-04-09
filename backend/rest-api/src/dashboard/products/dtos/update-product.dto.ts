import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateProductDTO } from './create-product.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ProductStatus } from '../products.types';

export class UpdateProductDTO extends PartialType(CreateProductDTO) {
  @ApiProperty()
  @IsNumber()
  product_id: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsEnum(['ACTIVE', 'HIDDEN'])
  status?: ProductStatus;
}
