import { PickType } from '@nestjs/swagger';
import { UpdateProductDTO } from './update-product.dto';

export class DeleteProductDTO extends PickType(UpdateProductDTO, [
  'product_id',
] as const) {}
