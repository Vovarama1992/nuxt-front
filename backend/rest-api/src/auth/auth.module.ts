import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'ewuiweowjdowojwoiwj',
      signOptions: {
        expiresIn: '60d',
      },
    }),
    RepositoryModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
