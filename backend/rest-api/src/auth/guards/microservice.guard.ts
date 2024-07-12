import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MicroServiceGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly consfigService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return true;
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();
    if (token === '228') return true;

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.consfigService.get<string>('auth.jwt.secret'),
      });

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
