import { Bot, CommandContext, InlineKeyboard } from 'grammy';
import { Command } from './command.class';
import { IAppContext } from '../context/context.interface';
import { ParseModeFlavor } from '@grammyjs/parse-mode';
import { getProfileName } from '../utils/profile-name';
import { ServiceAPI } from '../api/service.api';

export class StartCommand extends Command {
  public name = 'start';

  constructor(
    readonly bot: Bot<ParseModeFlavor<IAppContext>>,
    private readonly serviceAPI: ServiceAPI,
  ) {
    super(bot);
  }

  async handle(ctx: CommandContext<ParseModeFlavor<IAppContext>>) {
    return await ctx.replyWithHTML(
      `Здравствуйте, ${getProfileName(ctx.from)}!`,
      {
        reply_markup: InlineKeyboard.from([
          [
            InlineKeyboard.url(
              'Войти',
              `https://3hundred.ru/auth/${
                (await this.serviceAPI.signIn(ctx.from.id)).code
              }`,
            ),
          ],
        ]),
      },
    );
  }
}
