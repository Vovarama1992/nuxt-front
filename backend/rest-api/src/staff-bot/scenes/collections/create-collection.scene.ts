import { ParseModeFlavor } from '@grammyjs/parse-mode';
import { Collection, ObjectId } from 'mongodb';
import { Collection as col } from 'src/common/integrations/mongodb/mongodb.interfaces';
import {
  AppConversation,
  IAppContext,
} from 'src/staff-bot/context/context.interface';

export const SCENE_CREATE_COLLECTION = 'create-collection-scene';

const convert = (products: string): ObjectId[] => {
  const result = [];
  const els = products.split(';');

  for (let el of els) {
    el = el.trim();

    try {
      const id = new ObjectId(el);
      result.push(id);
    } catch (err) {
      continue;
    }
  }
  return result;
};

export const createCollectionScene = (Collections: Collection<col>) => {
  return async function (
    conversation: AppConversation,
    ctx: ParseModeFlavor<IAppContext>,
  ) {
    await ctx.reply('Введите название коллекции');
    const title = await conversation.form.text();

    await ctx.reply('Введите сылку куда будет вести коллекция');
    const to = await conversation.form.text();

    await ctx.reply(
      'Введите список id товаров\n\nПример:\n665454af9c323f11d1a8a75a;\n665454af9c323f11d1a8a75a;\n665454af9c323f11d1a8a75a',
    );
    const products = await conversation.form.text();

    try {
      await Collections.insertOne({
        _id: new ObjectId(),
        level: 0,
        title,
        to,
        products: convert(products),
      });

      await ctx.reply('Подборка создана!');
    } catch (err) {
      console.error(err);
      await ctx.reply('Возникла ошибка!');
    }
  };
};
