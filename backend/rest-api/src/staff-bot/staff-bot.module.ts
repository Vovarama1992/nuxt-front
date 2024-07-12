import { Module } from '@nestjs/common';
import { StaffBotService } from './staff-bot.service';
import { databaseProvider } from 'src/common/integrations/mongodb/mongodb.service';

@Module({
  providers: [StaffBotService, databaseProvider],
  exports: [StaffBotService],
})
export class StaffBotModule {}
