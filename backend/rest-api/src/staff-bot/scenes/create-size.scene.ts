import { InlineKeyboard } from 'grammy';
import { AppConversation, IAppContext } from '../context/context.interface';
import { Collection, ObjectId } from 'mongodb';
import { Product } from 'src/common/integrations/mongodb/mongodb.interfaces';

export const createSizeScene = (products: Collection<Product>) => {
  return async function (conversation: AppConversation, ctx: IAppContext) {
    await ctx.reply('Введите id товара');
    const id = await conversation.form.text();

    await ctx.reply('Введите количество (от 1 до 1 000 000)');
    const quantity = await conversation.form.int();

    await ctx.reply('Введите размер (34 или XXL)');
    const title = await conversation.form.text();

    await ctx.reply('Введите цену');
    const price = await conversation.form.number();

    try {
      const { modifiedCount } = await products.updateOne(
        { _id: new ObjectId(id) },
        {
          $push: {
            sizes: {
              _id: new ObjectId(),
              title,
              quantity,
              price,
            },
          },
        },
      );

      if (modifiedCount === 0) {
        await ctx.reply(
          `Изменения не были внесины! Скорее всего вы ввели неправильный id (${id})`,
        );
      }
    } catch (err) {
      await ctx.reply(
        `Возникла ошибка при добавлении! Изменения не внесены.\nСкорее всего вы ввели неправильный id (${id})`,
      );
    }

    await ctx.reply('Хотите добавить еще размер?', {
      reply_markup: InlineKeyboard.from([
        [
          InlineKeyboard.text('Да', 'size-create'),
          InlineKeyboard.text('Нет', 'products'),
        ],
      ]),
    });
  };
};
