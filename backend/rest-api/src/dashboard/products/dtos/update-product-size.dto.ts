import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { CreateProductSizeDTO } from './create-product-size.dto';

export class UpdateProductSizeDTO extends IntersectionType(
  PartialType(OmitType(CreateProductSizeDTO, ['product_id'] as const)),
  PickType(CreateProductSizeDTO, ['product_id'] as const),
) {}
