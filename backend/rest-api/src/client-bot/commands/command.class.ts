import { Bot, CommandContext } from 'grammy';
import { IAppContext } from '../context/context.interface';
import { ParseModeFlavor } from '@grammyjs/parse-mode';

export abstract class Command {
  public name = '';

  constructor(public bot: Bot<ParseModeFlavor<IAppContext>>) {
    this.handle = this.handle.bind(this);
  }

  abstract handle(ctx: CommandContext<ParseModeFlavor<IAppContext>>): any | Promise<any>;
}
