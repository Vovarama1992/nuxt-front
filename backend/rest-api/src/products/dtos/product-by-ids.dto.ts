import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetProductsGroupDTO {
  @ApiProperty({ type: String, isArray: true })
  @IsString({ each: true }) // it wouldn't add anything to the dto if it wasn't for this
  product_id: string[];
}
