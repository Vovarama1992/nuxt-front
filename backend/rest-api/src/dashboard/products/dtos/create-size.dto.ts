import { IsNumber, IsString } from 'class-validator';

export class CreateSizeDTO {
  @IsString()
  product_id: string;

  @IsNumber()
  current_price: number;

  @IsNumber()
  old_price: number;

  @IsNumber()
  quantity: number;

  @IsString()
  value: string;
}
