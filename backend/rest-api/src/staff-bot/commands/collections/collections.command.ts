import { Bot, InlineKeyboard } from 'grammy';
import { ParseModeFlavor } from '@grammyjs/parse-mode';
import { IAppContext } from 'src/staff-bot/context/context.interface';
import { getProfileName } from 'src/staff-bot/utils/profile-name';
import { Command } from '../command.class';
import { CQ_CREATE_COLLECTIN } from './create-collection.command';

export const CQ_COLLECTIONS = 'collections';

export class CollectionsCommand extends Command {
  constructor(readonly bot: Bot<ParseModeFlavor<IAppContext>>) {
    super(bot);
  }

  handle(): void {
    this.bot.callbackQuery(CQ_COLLECTIONS, async (ctx) => {
      return await ctx.replyWithHTML(
        `Здравствуйте, ${getProfileName(ctx.from)}!`,
        {
          reply_markup: InlineKeyboard.from([
            [InlineKeyboard.text('Создать', CQ_CREATE_COLLECTIN)],
          ]),
        },
      );
    });
  }
}
