import { Module } from '@nestjs/common';
import { databaseProvider } from 'src/common/integrations/mongodb/mongodb.service';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';

@Module({
  controllers: [FilesController],
  providers: [FilesService, databaseProvider],
})
export class FilesModule {}