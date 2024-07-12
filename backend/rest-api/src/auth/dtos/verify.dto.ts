import { IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyDTO {
  @ApiProperty()
  @IsString()
  @Length(4, 256)
  code: string;

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber('RU')
  phone_number?: string;
}
