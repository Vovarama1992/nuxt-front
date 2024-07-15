import { Bot, InlineKeyboard } from 'grammy';
import { Command } from './command.class';
import { IAppContext } from '../context/context.interface';
import { ParseModeFlavor } from '@grammyjs/parse-mode';
import { getProfileName } from '../utils/profile-name';
import { ServiceAPI } from '../api/service.api';

export class StartCommand extends Command {
  constructor(
    readonly bot: Bot<ParseModeFlavor<IAppContext>>,
    private readonly serviceAPI: ServiceAPI,
  ) {
    super(bot);
  }

  handle(): void {
    this.bot.command('start', async (ctx) => {
      return await ctx.replyWithHTML(
        `Здравствуйте, ${getProfileName(ctx.from)}!`,
        {
          reply_markup: InlineKeyboard.from([
            [
              InlineKeyboard.text('Подборки', 'collections'),
              InlineKeyboard.text('Товар', 'products'),
            ],
            [
              InlineKeyboard.url(
                'Войти',
                `https://dashboard.3hundred.ru/sign-in/${
                  (await this.serviceAPI.signIn(ctx.from.id)).code
                }`,
              ),
            ],
          ]),
        },
      );
    });
  }
}
