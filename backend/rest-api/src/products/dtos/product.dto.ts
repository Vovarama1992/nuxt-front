import { ApiProperty } from '@nestjs/swagger';
import { PartialDocumentDTO } from 'src/common/utils/default';

class PartialProductStatus {
  @ApiProperty({ type: Boolean })
  is_hidden: boolean;

  @ApiProperty({ type: Boolean })
  in_stock: boolean;

  @ApiProperty({ type: Boolean })
  is_sale: boolean;

  @ApiProperty({ type: Boolean })
  is_new: boolean;
}

class PartialProductSize extends PartialDocumentDTO {
  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: Number })
  price: number;

  @ApiProperty({ type: Number })
  quantity: number;
}

export class PartialProductResponseDTO extends PartialDocumentDTO {
  @ApiProperty({ type: String })
  preview: string;

  @ApiProperty({ type: String })
  preview_compress: string;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: Number })
  discount: number;

  @ApiProperty({ type: [ String ] })
  photos: string[];

  @ApiProperty({ type: [ String ] })
  photos_compress: string[];

  @ApiProperty({ type: PartialProductStatus })
  status: PartialProductStatus;

  @ApiProperty({ type: Number })
  min_price: number;
}

class ProductPackage {
  width: number;
  height: number;
  length: number;
  weight: number;
}

export class ProductResponseDTO extends PartialProductResponseDTO {
  @ApiProperty({ type: Date })
  created_at: string;

  @ApiProperty({ type: String })
  type: string;

  @ApiProperty({ type: String })
  brand: string;

  @ApiProperty({ type: String })
  size_grid: string;

  @ApiProperty({ type: [ String ] })
  similar: string[];

  @ApiProperty({ type: ProductPackage })
  package: ProductPackage;

  @ApiProperty({ type: [ PartialProductSize ] })
  sizes: PartialProductSize[];

  @ApiProperty({ type: undefined })
  min_price: undefined;
}