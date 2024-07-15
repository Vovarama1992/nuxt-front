import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Bot, GrammyError, HttpError, session } from 'grammy';
import { Collection, MongoClient } from 'mongodb';
import IORedis from 'ioredis';
import { DB_CONNECTION } from 'src/common/integrations/mongodb/mongodb.service';
import { RedisAdapter } from '@grammyjs/storage-redis';
import { ServiceAPI } from './api/service.api';
import { TelegramAPI } from './api/telegram.api';
import { hydrateReply, ParseModeFlavor } from '@grammyjs/parse-mode';
import { IAppContext } from './context/context.interface';
import { Command } from './commands/command.class';
import { StartCommand } from './commands/start.command';
import { conversations } from '@grammyjs/conversations';
import {
  Product,
  Collection as Coll,
} from 'src/common/integrations/mongodb/mongodb.interfaces';

@Injectable()
export class ClientBotService implements OnApplicationBootstrap {
  private Products: Collection<Product>;
  private Collections: Collection<Coll>;
  private commands: Command[] = [];
  private bot: Bot<ParseModeFlavor<IAppContext>>;
  private telegramAPI: TelegramAPI;
  private serviceAPI: ServiceAPI;

  constructor(
    @Inject(DB_CONNECTION)
    private readonly mongodbService: MongoClient,
  ) {
    this.Products = mongodbService.db('3hundred').collection('products');
    this.Collections = mongodbService.db('3hundred').collection('collections');
  }

  async onApplicationBootstrap() {
    const redisInstance = new IORedis(process.env.REDIS_URL);
    const storage = new RedisAdapter<any>({ instance: redisInstance });
    this.serviceAPI = new ServiceAPI();
    this.telegramAPI = new TelegramAPI();
    this.bot = new Bot<ParseModeFlavor<IAppContext>>(
      process.env.TELEGRAM_BOT_TOKEN_CLIENT,
    );

    this.bot.use(
      session({
        initial: () => ({
          profileId: null,
        }),
        storage,
      }),
    );
    this.bot.use(conversations());
    this.bot.use(hydrateReply);

    this.bot.catch(async (err) => {
      if (err instanceof GrammyError) {
        return console.error(err);
      }

      if (err instanceof HttpError) {
        return console.error(err);
      }

      console.error(err);
      await err.ctx.reply('Извините! Сейчас бот не может ответить 😞');
    });

    this.init();
  }

  getBot() {
    return this.bot;
  }

  async getFileURL(file_id: string) {
    const { file_path } = await this.bot.api.getFile(file_id);
    if (!file_path)
      throw new Error("couldn't get file_path for given file_id");
    return `https://api.telegram.org/file/bot${this.bot.token}/${file_path}`;
  }

  private async init() {
    this.commands = [
      new StartCommand(this.bot, this.serviceAPI)
    ];

    for (const command of this.commands)
      this.bot.command(command.name, command.handle);

    this.bot.start();
  }
}
