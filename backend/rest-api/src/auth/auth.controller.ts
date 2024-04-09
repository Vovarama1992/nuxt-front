import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignInDTO } from './dtos/sign-in.dto';
import { VerifyDTO } from './dtos/verify.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(204)
  async SignIn(@Body() dto: SignInDTO) {
    this.authService.signIn(dto);
  }

  @Post('verify')
  async verify(@Body() dto: VerifyDTO) {
    return this.authService.vrerify(dto);
  }
}
