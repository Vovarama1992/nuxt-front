import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

class Items {
  @IsMongoId({ message: 'Неверный ID товара!' })
  product_id: string;

  @IsMongoId({ message: 'Неверный ID размера!' })
  size_id: string;

  @IsNumber()
  @Min(1, { message: 'Количество товара не может быть меншь 1!' })
  @Max(1000, { message: 'Количество товара не может быть больше 1000!' })
  quantity: number;
}

export class CreateOrderDTO {
  @IsString()
  @Length(2, 256, { message: 'Имя слишком длинное или короткое!' })
  last_name: string;

  @IsString()
  @Length(2, 256, { message: 'Фамилия слишком длинная или короткая!' })
  first_name: string;

  @IsOptional()
  @IsString()
  @Length(2, 256, { message: 'Отчестов слишком длинное или короткое!' })
  surname?: string;

  @IsString()
  @Length(2, 256, { message: 'Неверный город!' })
  city: string;

  @IsString()
  @Length(2, 512, { message: 'Неверный адрес!' })
  address: string;

  @IsString()
  @Length(2, 128)
  delivery_method: string;

  @IsOptional()
  @IsString()
  @Length(1, 1024, { message: 'Слишком длинное сообщение!' })
  message?: string;

  @IsOptional()
  @IsString()
  @Length(12, 12, { message: 'Промокод должен содержать 12 символов!' })
  promo_code?: string;

  @ValidateNested({ each: true })
  @Type(() => Items)
  items: Items[];
}
