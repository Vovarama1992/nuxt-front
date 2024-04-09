import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/common/integrations/prisma/prisma.service';
import { SignInDTO } from './dtos/sign-in.dto';
import { Profiles } from '@prisma/client';
import { VerifyDTO } from './dtos/verify.dto';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  private readonly CODE_EX = 60000 * 5;
  private readonly CODE_PREFIX = 'code';
  private logger: Logger;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly cacheService: Cache,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  async signIn(dto: SignInDTO) {
    const code = this.generateVerifyCode();
    this.logger.debug(`code: ${code}`);

    try {
      await this.cacheService.set(
        `${this.CODE_PREFIX}:${dto.phone_number}`,
        code,
        this.CODE_EX,
      );
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(
        'the code could not be saved to the cache',
      );
    }
  }

  async vrerify(dto: VerifyDTO) {
    let candidate: { id: number } | null;

    const code = await this.cacheService.get<string>(
      `${this.CODE_PREFIX}:${dto.phone_number}`,
    );

    if (!code || code !== dto.code) {
      throw new BadRequestException('incorrect data');
    }

    try {
      candidate = await this.prisma.profiles.findUnique({
        select: {
          id: true,
        },
        where: {
          phone_number: dto.phone_number,
        } as Profiles,
      });
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException('failed to verify the candidate');
    }

    if (!candidate) {
      candidate = { id: await this.register(dto.phone_number) };
    }

    const payload = {
      profileId: candidate.id,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  private async register(phoneNumber: string) {
    try {
      const profile = await this.prisma.profiles.create({
        data: {
          created_at: new Date(),
          phone_number: phoneNumber,
        } as Profiles,
        select: {
          id: true,
        },
      });

      return profile.id;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException('failed to create a user');
    }
  }

  private generateVerifyCode(): string {
    let code = '';

    for (let i = 0; i < 4; i++) {
      code += Math.floor(Math.random() * 10);
    }

    return code;
  }
}
