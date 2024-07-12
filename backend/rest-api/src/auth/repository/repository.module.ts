import { Module } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { databaseProvider } from 'src/common/integrations/mongodb/mongodb.service';

@Module({
  imports: [],
  providers: [RepositoryService, databaseProvider],
  exports: [RepositoryService],
})
export class RepositoryModule {}
