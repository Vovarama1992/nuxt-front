import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';

export class SignInDTO {
  @ApiProperty()
  @IsPhoneNumber('RU')
  phone_number: string;
}
