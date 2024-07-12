import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { databaseProvider } from 'src/common/integrations/mongodb/mongodb.service';

@Module({
  providers: [SearchService, databaseProvider],
  controllers: [SearchController],
})
export class SearchModule {}
