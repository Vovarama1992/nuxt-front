import { IsArray, IsDefined } from 'class-validator';

export class ProductByIdsDTO {
  @IsArray()
  @IsDefined()
  products: {
    _id: string;
    size_id: string;
  }[];
}

export class GetProductsGroupDTO {
  @IsArray()
  @IsDefined()
  products_id: string[];
}
