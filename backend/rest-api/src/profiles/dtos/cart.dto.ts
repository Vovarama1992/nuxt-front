import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max, IsMongoId, IsNumber, IsIn } from 'class-validator';

export class CartItemDTO {
  @ApiProperty({ type: String })
  @IsMongoId()
  product_id: string;

  @ApiProperty({ type: String })
  @IsMongoId()
  size_id: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsInt()
  @Min(1)
  @Max(1000)
  quantity: number;
}

export class DeleteCartItem {
  @IsMongoId()
  product_id: string;

  @IsMongoId()
  size_id: string;
}

export class UpdateCartItem extends CartItemDTO {
  @IsMongoId()
  product_id: string;

  @IsMongoId()
  size_id: string;

  @IsInt()
  @IsIn([1, -1])
  quantity: number;
}

export class GetCartResponseDTO {
  @ApiProperty({ type: [ CartItemDTO ] })
  cart: CartItemDTO[];
}