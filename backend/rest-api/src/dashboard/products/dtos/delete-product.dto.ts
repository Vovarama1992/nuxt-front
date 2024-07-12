import { IsMongoId, IsString } from 'class-validator';

export class DeleteProductDTO {
  @IsString()
  @IsMongoId()
  product_id: string;
}
