import { IsIn, IsInt, IsMongoId } from 'class-validator';

export class UpdateCartItem {
  @IsMongoId()
  product_id: string;

  @IsMongoId()
  size_id: string;

  @IsInt()
  @IsIn([1, -1])
  quantity: number;
}
