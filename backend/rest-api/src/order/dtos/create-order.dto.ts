import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsInt,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongodb';
import { DeliveryMethod } from 'src/common/utils/enums';
class ProductDTO2 {
  @IsMongoId()
  product_id: string;

  @IsMongoId()
  size_id: string;

  @IsDefined()
  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(10000)
  quantity: number;
}

export class ProductDTO {
  @IsMongoId()
  product_id: ObjectId;
  product_title: string;
  product_brand: string;
  product_type: string;
  product_size_grid: string;

  @IsMongoId()
  size_id: ObjectId;
  size_title: string;
  size_price: number;

  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(10000)
  quantity: number;
}

export class AddressDTO {
  @IsString()
  @Length(0, 128)
  city: string;

  @IsString()
  @Length(0, 512)
  address: string;
}

export class CreateOrderDTO {
  @IsString()
  @Length(1, 128)
  first_name: string;

  @IsString()
  @Length(1, 128)
  last_name: string;

  @IsString()
  @Length(0, 6)
  postal_code: string;

  @IsPhoneNumber('RU')
  phone_number: string;

  @IsString()
  @Length(0, 256)
  pvz: string;

  @IsOptional()
  @IsString()
  @Length(0, 128)
  surname?: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => AddressDTO)
  delivery_address: AddressDTO;

  @IsDefined()
  @IsString()
  @IsEnum(DeliveryMethod)
  delivery_method: DeliveryMethod;

  @IsOptional()
  @IsString()
  @Length(0, 256)
  message: string;

  @IsOptional()
  @IsString()
  @Length(0, 128)
  promocode?: string;

  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDTO2)
  products: ProductDTO2[];
}
