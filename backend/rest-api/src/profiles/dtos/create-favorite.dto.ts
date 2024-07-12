import { IsMongoId } from 'class-validator';

export class CreateFavoriteDTO {
  @IsMongoId()
  product_id: string;
}
