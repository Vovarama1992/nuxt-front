import { Bot } from 'grammy';
import { Command } from './command.class';
import { IAppContext } from '../context/context.interface';
import { ParseModeFlavor } from '@grammyjs/parse-mode';

export class SizeCreateCommand extends Command {
  constructor(readonly bot: Bot<ParseModeFlavor<IAppContext>>) {
    super(bot);
  }

  handle(): void {
    this.bot.callbackQuery('size-create', async (ctx) => {
      await ctx.conversation.enter('create-size-scene');
    });
  }
}
