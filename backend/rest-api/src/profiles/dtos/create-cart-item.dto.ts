import { IsInt, Min, Max, IsMongoId, IsNumber } from 'class-validator';

export class CreateCardItemDTO {
  @IsMongoId()
  product_id: string;

  @IsMongoId()
  size_id: string;

  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(1000)
  quantity: number;
}
