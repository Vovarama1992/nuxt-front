import { ApiProperty } from '@nestjs/swagger';
import { IsLowercase, IsString, Length } from 'class-validator';

export class CreateProductDTO {
  @ApiProperty()
  @IsString()
  @Length(1, 64)
  brand: string;

  @IsString()
  @IsLowercase()
  @Length(1, 64)
  type: string;

  @ApiProperty()
  @Length(1, 256)
  title: string;
}
