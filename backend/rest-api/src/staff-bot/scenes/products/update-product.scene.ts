import { InlineKeyboard } from 'grammy';
import { AppConversation, IAppContext } from '../../context/context.interface';
import { Collection, ObjectId } from 'mongodb';
import { Product } from 'src/common/integrations/mongodb/mongodb.interfaces';
import { ParseModeFlavor } from '@grammyjs/parse-mode';

export const updateProductScene = (products: Collection<Product>) => {
  const { format } = new Intl.DateTimeFormat('ru', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  return async function (
    conversation: AppConversation,
    ctx: ParseModeFlavor<IAppContext>,
  ) {
    await ctx.reply('Введите id товара');
    const id = await conversation.form.text();

    try {
      const result = await products.findOne({ _id: new ObjectId(id) });

      if (result) {
        ctx.session.selectedProdutId = new ObjectId(id);

        await ctx.replyWithPhoto('https://api.3hundred.ru/' + result.preview, {
          caption: `
<b>id:</b> ${result._id}
<b>дата создания:</b> ${format(result.created_at)}
<b>Тип:</b> ${result.type}
<b>Бренд:</b> ${result.brand}
<b>Название:</b> ${result.title}
<b>Размерная сетка:</b> ${result.size_grid}

${result.status.is_hidden ? '❌' : '✅'}: <b>Статус "Скрыт от пользователя"</b>
${result.status.in_stock ? '✅' : '❌'}: <b>Статус "Экспресс"</b>
${result.status.is_new ? '✅' : '❌'}: <b>Статус "Новинка"</b>
${result.status.is_sale ? '✅' : '❌'}: <b>Статус "Популярный"</b>

`,
          parse_mode: 'HTML',
          reply_markup: InlineKeyboard.from([
            [
              InlineKeyboard.text('🔙', 'products'),
              InlineKeyboard.text('🗑 ', `product-delete`),
            ],
            [
              InlineKeyboard.text('Основная информация', `product-description`),
              InlineKeyboard.text('Фотографии', `product-photos`),
            ],
            [
              InlineKeyboard.text('Статусы', `product-statuses`),
              InlineKeyboard.text('Размеры', `product-sizes`),
            ],
          ]),
        });
      } else {
        await ctx.reply('Товар не найден!');
      }
    } catch (err) {
      console.log(err);
      await ctx.reply(`Возникла ошибка при поиске!`);
    }
  };
};
