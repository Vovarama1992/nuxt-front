import { Bot } from 'grammy';
import { Command } from './command.class';
import { IAppContext } from '../context/context.interface';
import { ParseModeFlavor } from '@grammyjs/parse-mode';

export class ProductUpdateCommand extends Command {
  constructor(readonly bot: Bot<ParseModeFlavor<IAppContext>>) {
    super(bot);
  }

  handle(): void {
    this.bot.callbackQuery('product-update', async (ctx) => {
      await ctx.conversation.enter('update-product-scene');
    });
  }
}
