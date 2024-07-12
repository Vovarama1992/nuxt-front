import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { databaseProvider } from 'src/common/integrations/mongodb/mongodb.service';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService, databaseProvider],
})
export class ProductsModule {}
