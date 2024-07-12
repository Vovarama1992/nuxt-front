import { Bot } from 'grammy';
import { IAppContext } from '../context/context.interface';
import { ParseModeFlavor } from '@grammyjs/parse-mode';

export abstract class Command {
  constructor(public bot: Bot<ParseModeFlavor<IAppContext>>) {}

  abstract handle(): void;
}
