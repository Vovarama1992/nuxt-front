import { ApiProperty } from '@nestjs/swagger';
import { PartialDocumentDTO } from 'src/common/utils/default';

class Price {
  @ApiProperty({ type: Number })
  min: number;

  @ApiProperty({ type: Number })
  max: number;
}

class Filter extends PartialDocumentDTO {
  @ApiProperty({ type: Number })
  count: number;
}

export class FiltersResponseDTO {
  @ApiProperty({ type: [ Filter ] })
  brands: Filter[];

  @ApiProperty({ type: [ Filter ] })
  types: Filter[];

  @ApiProperty({ type: [ Filter ] })
  sizes: Filter[];

  @ApiProperty({ type: Price })
  price: Price;
}