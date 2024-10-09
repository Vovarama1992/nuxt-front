import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignInDTO, SignInResponseDTO } from './dtos/sign-in.dto';
import { VerifyDTO, VerifyResponseDTO } from './dtos/verify.dto';
import { SignUpDTO } from './dtos/sign-up.dto';
import { MicroServiceGuard } from './guards/microservice.guard';
import { SignInTelegramDTO, SignInTelegramResponseDTO } from './dtos/sign-in-telegram.dto';
import { ProfileIdResponseDTO } from './dtos/profile-id.dt';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    type: SignInResponseDTO
  })
  @Post('sign-in/phone-number')
  async signIn(@Body() dto: SignInDTO) {
    await this.authService.generateVerifyCode('phone_number', dto.phone_number);

    return {
      message: 'next step: go through the confirmation code',
    };
  }

  @ApiOkResponse({
    type: SignInTelegramResponseDTO
  })
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

  @ApiOkResponse({
    type: VerifyResponseDTO
  })
  @Post('verify')
  async verify(@Body() dto: VerifyDTO) {
    return {
      access_token: await this.authService.vrerify(dto),
    };
  }

  // TODO: Сделать отдельный guard для связи сервисов.
  @ApiOkResponse({
    type: ProfileIdResponseDTO
  })
  @UseGuards(MicroServiceGuard)
  @Post('profile-id')
  async profileId(@Body() dto: SignUpDTO) {
    return {
      profile_id: await this.authService.getProfileId(dto),
    };
  }
}
