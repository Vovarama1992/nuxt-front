import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class ProductsFiltersQuery {
  @IsOptional()
  @Transform(({ value }) => value.split(',').map(Number))
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  types?: number[];

  @IsOptional()
  @Transform(({ value }) => {
    console.log(value);
    return value.split(',').map(Number);
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  brands?: number[];

  @IsOptional()
  @Transform(({ value }) => value.split(','))
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  values?: string[];
}

export class ProductsSortQuery {
  @IsOptional()
  @Type(() => Number)
  @IsEnum([-1, 1])
  date?: number;
}

export class GetProductsQueryParams {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(500)
  limit: number;

  @IsOptional()
  @Transform(({ value }) => {
    const result = new ProductsFiltersQuery();
    const elems = value.split(';');

    elems.forEach((el) => {
      el = el.split(':');
      el[1] = el[1].split(',');
      if (['types', 'brands'].includes(el[0])) el[1] = el[1].map(Number);

      result[el[0]] = el[1];
    });
    return result;
  })
  @ValidateNested()
  @Type(() => ProductsFiltersQuery)
  filters?: ProductsFiltersQuery;

  @IsOptional()
  @Transform(({ value }) => {
    const result = new ProductsSortQuery();
    const elems = value.split(';');
    elems.forEach((el) => {
      el = el.split(':');
      el[1] = el[1].split(',');
      if (['date'].includes(el[0])) el[1] = el[1].map(Number);

      result[el[0]] = el[1];
    });
    return result;
  })
  @ValidateNested()
  @Type(() => ProductsSortQuery)
  sort?: ProductsSortQuery;
}
