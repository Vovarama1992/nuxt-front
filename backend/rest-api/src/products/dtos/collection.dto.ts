import { ApiProperty } from '@nestjs/swagger';
import { PartialProductResponseDTO } from './product.dto';

export class CollectionResponseDTO {
  @ApiProperty({ type: Number })
  level: number;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  to: string;

  @ApiProperty({ type: [ PartialProductResponseDTO ] })
  products_full: PartialProductResponseDTO[];
}