import { IsMongoId } from 'class-validator';

export class DeleteCartItem {
  @IsMongoId()
  product_id: string;

  @IsMongoId()
  size_id: string;
}
