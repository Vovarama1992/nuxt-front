import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { databaseProvider } from 'src/common/integrations/mongodb/mongodb.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, databaseProvider],
  imports: [],
})
export class ProductsModule {}
