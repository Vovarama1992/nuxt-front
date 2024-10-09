import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class FavoritesResponseDTO {
  @ApiProperty({ type: [ String ] })
  favourites: string[];
}

export class CreateFavoriteDTO {
  @IsMongoId()
  product_id: string;
}
