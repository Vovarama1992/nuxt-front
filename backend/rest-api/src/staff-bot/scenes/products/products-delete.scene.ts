import { AppConversation, IAppContext } from '../../context/context.interface';
import { Collection, ObjectId } from 'mongodb';
import { Product } from 'src/common/integrations/mongodb/mongodb.interfaces';
import { ParseModeFlavor } from '@grammyjs/parse-mode';

export const DELETE_PRODUCT_SCENE = 'delete-product-scene';

export const deleteProductScene = (products: Collection<Product>) => {
  return async function (
    conversation: AppConversation,
    ctx: ParseModeFlavor<IAppContext>,
  ) {
    await ctx.reply(
      'Если вы действительно хотите удалить товар, то введите его id. Если хотите вернуться, то введите "Выход"',
    );
    const id = await conversation.form.text();

    if (id.toLowerCase() === 'выход') {
      return;
    } else {
      try {
        const { deletedCount } = await products.deleteOne({
          _id: new ObjectId(id),
        });

        if (deletedCount > 0) {
          await ctx.reply('Товар удален');
        } else {
          await ctx.reply('Товар не найден!');
        }
      } catch (err) {
        console.log(err);
        await ctx.reply(`Возникла ошибка при поиске!`);
      }
    }
  };
};
