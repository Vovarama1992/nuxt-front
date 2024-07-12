import { Bot } from 'grammy';
import { Command } from '../command.class';
import { IAppContext } from '../../context/context.interface';
import { ParseModeFlavor } from '@grammyjs/parse-mode';
import { DESCRIPTION_PRODUCT_SCENE } from 'src/staff-bot/scenes/products/product-description.scene';

export class DescriptionProductCommand extends Command {
  constructor(readonly bot: Bot<ParseModeFlavor<IAppContext>>) {
    super(bot);
  }

  handle(): void {
    this.bot.callbackQuery('product-description', async (ctx) => {
      await ctx.conversation.enter(DESCRIPTION_PRODUCT_SCENE);
    });
  }
}
