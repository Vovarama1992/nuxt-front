import { Module } from '@nestjs/common';
import { ClientBotService } from './client-bot.service';
import { databaseProvider } from 'src/common/integrations/mongodb/mongodb.service';

@Module({
  providers: [ClientBotService, databaseProvider],
  exports: [ClientBotService],
})
export class ClientBotModule {}
