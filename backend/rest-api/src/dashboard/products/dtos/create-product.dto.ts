import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsInt,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

class PhotoDTO {
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

export class CreateProductDTO {
  @IsDefined()
  @IsString()
  @Length(1, 256)
  title: string;

  @IsDefined()
  @IsString()
  @Length(1, 256)
  brand: string;

  @IsDefined()
  @IsString()
  @Length(1, 256)
  type: string;

  @IsDefined()
  @IsBoolean()
  in_stock: boolean;

  @IsDefined()
  @IsBoolean()
  in_new: boolean;

  @IsDefined()
  @IsBoolean()
  in_sale: boolean;

  @IsDefined()
  @IsArray()
  photos: PhotoDTO[];

  @IsDefined()
  preview: PhotoDTO;

  @IsDefined()
  @IsString()
  size_grid: string;

  @IsDefined()
  @IsInt()
  @IsNumber()
  @Min(1)
  @Max(1000000)
  width: number;

  @IsDefined()
  @IsInt()
  @IsNumber()
  @Min(1)
  @Max(1000000)
  height: number;

  @IsDefined()
  @IsInt()
  @IsNumber()
  @Min(1)
  @Max(1000000)
  length: number;

  @IsDefined()
  @IsInt()
  @IsNumber()
  @Min(1)
  @Max(1000000)
  weight: number;
}
