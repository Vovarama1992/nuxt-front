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
import { auth } from './middleware/auth.middleware';
import { StartCommand } from './commands/start.command';
import { ProductsCommand } from './commands/products.command';
import { conversations, createConversation } from '@grammyjs/conversations';
import { createProductScene } from './scenes/create-product.scene';
import { ProductsCreateCommand } from './commands/products-create.command';
import {
  Product,
  Collection as Coll,
  File,
} from 'src/common/integrations/mongodb/mongodb.interfaces';
import { SizeCreateCommand } from './commands/size-create.command';
import { createSizeScene } from './scenes/create-size.scene';
import { ProductUpdateCommand } from './commands/product-update.command';
import { updateProductScene } from './scenes/products/update-product.scene';
import { CollectionsCommand } from './commands/collections/collections.command';
import { CreateCollectionCommand } from './commands/collections/create-collection.command';
import {
  createCollectionScene,
  SCENE_CREATE_COLLECTION,
} from './scenes/collections/create-collection.scene';
import {
  DESCRIPTION_PRODUCT_SCENE,
  descriptionProductScene,
} from './scenes/products/product-description.scene';
import { DescriptionProductCommand } from './commands/products/product-description.command';

@Injectable()
export class StaffBotService implements OnApplicationBootstrap {
  private Files: Collection<File>;
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
    this.Files = mongodbService.db('3hundred').collection('files');
  }

  async onApplicationBootstrap() {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    if (!botToken) {
      console.log(
        'Telegram Bot token is missing in StaffBotService. Skipping Telegram bot initialization.',
      );
      return;
    }

    const redisInstance = new IORedis(process.env.REDIS_URL);
    const storage = new RedisAdapter({ instance: redisInstance });
    this.serviceAPI = new ServiceAPI();
    this.telegramAPI = new TelegramAPI();
    this.bot = new Bot<ParseModeFlavor<IAppContext>>(botToken);

    this.bot.use(auth);
    this.bot.use(
      session({
        initial: () => ({
          profileId: null,
          fullPhotos: [],
          compressPhotos: [],
        }),
        storage,
      }),
    );
    this.bot.use(conversations());
    this.bot.use(
      createConversation(
        createProductScene(this.Products, this.Files),
        'create-product-scene',
      ),
      createConversation(createSizeScene(this.Products), 'create-size-scene'),
      createConversation(
        updateProductScene(this.Products),
        'update-product-scene',
      ),
      createConversation(
        createCollectionScene(this.Collections),
        SCENE_CREATE_COLLECTION,
      ),
      createConversation(
        descriptionProductScene(this.Products),
        DESCRIPTION_PRODUCT_SCENE,
      ),
    );
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

  private async init() {
    this.commands = [
      new StartCommand(this.bot, this.serviceAPI),
      new CollectionsCommand(this.bot),
      new CreateCollectionCommand(this.bot),
      new ProductsCommand(this.bot),
      new ProductsCreateCommand(this.bot),
      new SizeCreateCommand(this.bot),
      new ProductUpdateCommand(this.bot),
      new ProductUpdateCommand(this.bot),
      new DescriptionProductCommand(this.bot),
    ];

    for (const command of this.commands) {
      command.handle();
    }

    this.bot.start();
    console.log(await (this.bot as any).mePromise);
  }
}
