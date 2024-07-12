import { Module } from '@nestjs/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './common/config/validate';
import { CacheModule } from '@nestjs/cache-manager';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProductsModule } from './products/products.module';
import { ProfilesModule } from './profiles/profiles.module';
import { StaffBotModule } from './staff-bot/staff-bot.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    DashboardModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'static'),
      exclude: ['/v1/(.*)'],
    }),
    ProductsModule,
    ProfilesModule,
    StaffBotModule,
    OrderModule,
  ],
  controllers: [],
})
export class AppModule {}
