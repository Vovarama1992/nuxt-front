import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateProductSizeDTO {
  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(1_000_000_000)
  product_id: number;

  @ApiProperty()
  @IsString()
  @Length(1, 12)
  tag: string;

  @ApiProperty()
  @IsString()
  @Length(1, 32)
  value: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(100000)
  length: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(100000)
  width: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(100000)
  height: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(100000)
  weight: number;

  @ApiProperty()
  @IsNumber()
  @Max(100000)
  count: number;

  @ApiProperty()
  @IsNumber()
  @Max(1_000_000_000)
  old_price: number;

  @ApiProperty()
  @IsNumber()
  @Max(1_000_000_000)
  current_price: number;

  @IsBoolean()
  in_stock: boolean;
}
