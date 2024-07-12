import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsInt,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class PhotoDTO {
  @IsString()
  title: string;

  @IsDefined()
  @IsString()
  mimetype: string;

  @IsDefined()
  @IsInt()
  @IsNumber()
  size: number;
}

export class UpdateProductDTO {
  @IsMongoId()
  @IsString()
  product_id: string;

  @IsOptional()
  @IsDefined()
  @IsString()
  @Length(1, 256)
  title: string;

  @IsOptional()
  @IsDefined()
  @IsString()
  @Length(1, 256)
  brand: string;

  @IsOptional()
  @IsDefined()
  @IsString()
  @Length(1, 256)
  type: string;

  @IsOptional()
  @IsDefined()
  @IsBoolean()
  in_stock: boolean;

  @IsOptional()
  @IsDefined()
  @IsBoolean()
  in_new: boolean;

  @IsOptional()
  @IsDefined()
  @IsBoolean()
  in_sale: boolean;

  @IsOptional()
  @IsDefined()
  @IsArray()
  photos: PhotoDTO[];

  @IsOptional()
  @IsDefined()
  @IsArray()
  delete_photos: PhotoDTO[];

  @IsOptional()
  @IsDefined()
  preview: PhotoDTO;

  @IsOptional()
  @IsDefined()
  @IsString()
  size_grid: string;

  @IsOptional()
  @IsDefined()
  @IsInt()
  @IsNumber()
  @Min(1)
  @Max(1000000)
  width: number;

  @IsOptional()
  @IsDefined()
  @IsInt()
  @IsNumber()
  @Min(1)
  @Max(1000000)
  height: number;

  @IsOptional()
  @IsDefined()
  @IsInt()
  @IsNumber()
  @Min(1)
  @Max(1000000)
  length: number;

  @IsOptional()
  @IsDefined()
  @IsInt()
  @IsNumber()
  @Min(1)
  @Max(1000000)
  weight: number;

  @IsOptional()
  @IsDefined()
  @IsBoolean()
  is_hidden: boolean;
}
