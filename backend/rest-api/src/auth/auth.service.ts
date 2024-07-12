import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { VerifyDTO } from './dtos/verify.dto';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { SignUpDTO } from './dtos/sign-up.dto';
import { RepositoryService } from './repository/repository.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  private readonly CODE_EX = 60000 * 5;
  private readonly CODE_PREFIX = 'code';
  private logger: Logger;

  constructor(
    private readonly jwtService: JwtService,
    private readonly repositoryService: RepositoryService,
    @Inject(CACHE_MANAGER) private readonly cacheService: Cache,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  async getProfileId(dto: SignUpDTO) {
    const profileId = await this.repositoryService.findProfile({
      telegramId: BigInt(dto.telegram_id),
    });

    if (profileId) return profileId;

    return await this.repositoryService.createProfile({
      telegramId: BigInt(dto.telegram_id),
    });
  }

  async generateVerifyCode(schema: 'telegram' | 'phone_number', id: string) {
    const code = schema === 'telegram' ? uuidv4() : this.generateCode();
    this.logger.debug('code: ', code);

    if (schema === 'telegram') {
      await this.cacheService.set(
        `${this.CODE_PREFIX}:${code}`,
        id,
        this.CODE_EX,
      );
    } else {
      await this.cacheService.set(
        `${this.CODE_PREFIX}:${id}`,
        code,
        this.CODE_EX,
      );
    }

    return code;
  }

  async vrerify(dto: VerifyDTO) {
    let code: string;
    let telegramId: number;
    console.log('dto: ', dto.code, dto.phone_number);

    if (dto.phone_number) {
      code = await this.cacheService.get<string>(
        `${this.CODE_PREFIX}:${dto.phone_number}`,
      );

      if (!code || code !== dto.code)
        throw new BadRequestException('incorrect data');
    } else {
      telegramId = +(await this.cacheService.get<string>(
        `${this.CODE_PREFIX}:${dto.code}`,
      ));

      if (!telegramId) throw new BadRequestException('incorrect data');
    }

    let profileData = await this.repositoryService.findProfile({
      phoneNumber: dto.phone_number,
      telegramId: BigInt(telegramId),
    });
    console.log(profileData);

    if (!profileData) {
      profileData = await this.repositoryService.createProfile({
        phoneNumber: dto.phone_number,
        telegramId: BigInt(telegramId),
      });
    }

    console.log('2: ', profileData);
    console.log({
      profileId: profileData._id.toString(),
      role: profileData.role,
    });

    return await this.jwtService.signAsync({
      profileId: profileData._id.toString(),
      role: profileData.role,
    });
  }

  generateCode(): string {
    let code = '';

    for (let i = 0; i < 4; i++) {
      code += Math.floor(Math.random() * 10);
    }

    return code;
  }
}
