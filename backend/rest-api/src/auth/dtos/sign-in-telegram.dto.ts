import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber } from 'class-validator';

export class SignInTelegramDTO {
  @ApiProperty()
  @IsInt()
  @IsNumber()
  telegram_id: number;
}
