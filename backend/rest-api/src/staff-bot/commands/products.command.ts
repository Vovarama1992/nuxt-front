import { Bot, InlineKeyboard } from 'grammy';
import { Command } from './command.class';
import { IAppContext } from '../context/context.interface';
import { ParseModeFlavor } from '@grammyjs/parse-mode';

const text = `
🗂 Меню -> Управление товаром
`;

export class ProductsCommand extends Command {
  constructor(readonly bot: Bot<ParseModeFlavor<IAppContext>>) {
    super(bot);
  }

  handle(): void {
    this.bot.callbackQuery('products', async (ctx) => {
      return await ctx.replyWithHTML(text, {
        reply_markup: InlineKeyboard.from([
          [
            InlineKeyboard.text('Создать товара', 'product-create'),
            InlineKeyboard.text('Добавить размер', 'size-create'),
          ],
          [InlineKeyboard.text('Изменить товара', 'product-update')],
        ]),
      });
    });
  }
}
