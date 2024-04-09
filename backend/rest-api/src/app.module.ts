import { Module } from '@nestjs/common';
import { ProfilesModule } from './profiles/profiles.module';
import { ProductsModule } from './products/products.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './common/config/validate';
import { CacheModule } from '@nestjs/cache-manager';
import { PrismaModule } from './common/integrations/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ProfilesModule,
    ProductsModule,
    DashboardModule,
    BlogModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
