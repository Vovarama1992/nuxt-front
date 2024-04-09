import { IsString, Length } from 'class-validator';
import { SignInDTO } from './sign-in.dto';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyDTO extends SignInDTO {
  @ApiProperty()
  @IsString()
  @Length(4, 4)
  code: string;
}
