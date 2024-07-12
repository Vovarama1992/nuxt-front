import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsInt,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class GetProductDTO {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsInt()
  @Min(0)
  max_price?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsInt()
  @Min(0)
  min_price?: number;

  @IsOptional()
  @Transform(({ value }) => {
    console.log(value);
    return value?.split(';') || [];
  })
  type?: string[];

  @IsOptional()
  @Transform(({ value }) => {
    console.log(value);
    return value?.split(';') || [];
  })
  brand?: string[];

  @IsOptional()
  @Transform(({ value }) => {
    return value?.split(';') || [];
  })
  sizes?: string[];

  @IsOptional()
  @Transform(({ value }) => (value === 'true' ? true : false))
  @IsBoolean()
  @IsDefined()
  is_new?: boolean;

  @IsOptional()
  @Transform(({ value }) => (value === 'true' ? true : false))
  @IsBoolean()
  @IsDefined()
  is_sale?: boolean;

  @IsOptional()
  @Transform(({ value }) => (value === 'true' ? true : false))
  @IsBoolean()
  @IsDefined()
  in_stock?: boolean;
}
