import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber } from 'class-validator';

export class SignUpDTO {
  @ApiProperty()
  @IsInt()
  @IsNumber()
  telegram_id: number;
}