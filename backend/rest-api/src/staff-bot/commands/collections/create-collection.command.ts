import { Bot } from 'grammy';
import { ParseModeFlavor } from '@grammyjs/parse-mode';
import { IAppContext } from 'src/staff-bot/context/context.interface';
import { Command } from '../command.class';
import { SCENE_CREATE_COLLECTION } from 'src/staff-bot/scenes/collections/create-collection.scene';

export const CQ_CREATE_COLLECTIN = 'create-collection';

export class CreateCollectionCommand extends Command {
  constructor(readonly bot: Bot<ParseModeFlavor<IAppContext>>) {
    super(bot);
  }

  handle(): void {
    this.bot.callbackQuery(CQ_CREATE_COLLECTIN, async (ctx) => {
      return await ctx.conversation.enter(SCENE_CREATE_COLLECTION);
    });
  }
}
