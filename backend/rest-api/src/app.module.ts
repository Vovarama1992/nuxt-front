import { MiddlewareConsumer, Module } from '@nestjs/common';
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
import { FilesModule } from './files/files.module';
import { NewsModule } from './news/news.module';

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
      rootPath: join(__dirname, '..', '..', '..', 'static'),
      serveRoot: '/static'
    }),
    ProductsModule,
    ProfilesModule,
    StaffBotModule,
    OrderModule,
    FilesModule,
    NewsModule
  ],
  controllers: [],
})
export class AppModule {}
