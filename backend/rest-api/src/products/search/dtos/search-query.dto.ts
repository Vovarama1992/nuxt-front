import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class SearchQueryDTO {
  @IsString()
  @MinLength(1)
  text?: string;

  @IsOptional()
  @Transform((params) => parseFloat(params.value || '1'))
  @IsInt()
  @Min(1)
  @Max(40)
  limit?: number;

  @IsOptional()
  @Transform((params) => parseFloat(params.value || '1'))
  @IsInt()
  @Min(1)
  page?: number;
}
