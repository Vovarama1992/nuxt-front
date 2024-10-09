import { Module } from '@nestjs/common';
import { databaseProvider } from 'src/common/integrations/mongodb/mongodb.service';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';

@Module({
  controllers: [NewsController],
  providers: [NewsService, databaseProvider],
})
export class NewsModule {}