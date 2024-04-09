import { Module } from '@nestjs/common';
import { ProfilesModule } from './profiles/profiles.module';
import { ProductsModule } from './products/products.module';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [ProfilesModule, ProductsModule, PhotosModule],
})
export class DashboardModule {}
