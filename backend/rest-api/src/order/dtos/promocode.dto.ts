import { ApiProperty } from '@nestjs/swagger';
import { PromocodeTypes } from 'src/common/utils/enums';

export class PromocodeResponseDTO {
  @ApiProperty({ enum: PromocodeTypes })
  type: PromocodeTypes;

  @ApiProperty({ type: Number, required: false })
  discount?: number;

  @ApiProperty({ type: Number, required: false })
  price?: number;

  @ApiProperty({ type: String, required: false })
  partner?: string;
}