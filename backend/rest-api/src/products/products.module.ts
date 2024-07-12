import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { databaseProvider } from 'src/common/integrations/mongodb/mongodb.service';
import { SearchModule } from './search/search.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, databaseProvider],
  imports: [SearchModule],
})
export class ProductsModule {}
