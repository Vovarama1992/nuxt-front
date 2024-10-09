import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsInt,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { PaginationDTO, PaginationResponseDTO } from 'src/common/utils/paginate';
import { PartialProductResponseDTO } from './product.dto';

export class GetProductDTO extends PaginationDTO {
  @ApiProperty({
    type: Number,
    required: false
  })
  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsInt()
  @Min(0)
  max_price?: number;

  @ApiProperty({
    type: Number,
    required: false
  })
  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsInt()
  @Min(0)
  min_price?: number;

  @ApiProperty({
    type: [ String ],
    required: false
  })
  @IsOptional()
  type?: string[] | string;

  @ApiProperty({
    type: [ String ],
    required: false
  })
  @IsOptional()
  brand?: string[] | string;

  @ApiProperty({
    type: [ String ],
    required: false
  })
  @IsOptional()
  sizes?: string[] | string;

  @ApiProperty({
    type: String,
    required: false
  })
  @IsOptional()
  q?: string;

  @ApiProperty({
    type: Boolean,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  @IsDefined()
  is_new?: boolean;

  @ApiProperty({
    type: Boolean,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  @IsDefined()
  is_sale?: boolean;

  @ApiProperty({
    type: Boolean,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  @IsDefined()
  in_stock?: boolean;
}

export class GetProductsResponseDTO extends PaginationResponseDTO {
  @ApiProperty({ type: [ PartialProductResponseDTO ] })
  content: PartialProductResponseDTO[];
}