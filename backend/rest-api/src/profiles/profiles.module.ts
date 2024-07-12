import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { databaseProvider } from 'src/common/integrations/mongodb/mongodb.service';
import { ClientBotModule } from 'src/client-bot/client-bot.module';

@Module({
  imports: [ClientBotModule],
  controllers: [ProfilesController],
  providers: [ProfilesService, databaseProvider],
})
export class ProfilesModule {}
