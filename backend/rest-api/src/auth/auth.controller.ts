import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignInDTO } from './dtos/sign-in.dto';
import { VerifyDTO } from './dtos/verify.dto';
import { SignUpDTO } from './dtos/sign-up.dto';
import { MicroServiceGuard } from './guards/microservice.guard';
import { SignInTelegramDTO } from './dtos/sign-in-telegram.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in/phone-number')
  async signIn(@Body() dto: SignInDTO) {
    await this.authService.generateVerifyCode('phone_number', dto.phone_number);

    return {
      message: 'next step: go through the confirmation code',
    };
  }

  @UseGuards(MicroServiceGuard)
  @Post('sign-in/telegram')
  async signInTelegram(@Body() dto: SignInTelegramDTO) {
    return {
      code: await this.authService.generateVerifyCode(
        'telegram',
        dto.telegram_id.toString(),
      ),
    };
  }

  @Post('verify')
  async verify(@Body() dto: VerifyDTO) {
    return {
      access_token: await this.authService.vrerify(dto),
    };
  }

  // TODO: Сделать отдельный guard для связи сервисов.
  @UseGuards(MicroServiceGuard)
  @Post('profile-id')
  async profileId(@Body() dto: SignUpDTO) {
    return {
      profile_id: await this.authService.getProfileId(dto),
    };
  }
}
