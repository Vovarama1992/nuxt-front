import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeleteProductSizeDTO {
  @ApiProperty()
  @IsNumber()
  product_size_id: number;
}
