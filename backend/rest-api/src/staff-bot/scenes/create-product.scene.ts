import { join } from 'path';
import { TelegramAPI } from '../api/telegram.api';
import { AppConversation, IAppContext } from '../context/context.interface';
import { writeFile } from 'fs/promises';
import { Collection, ObjectId } from 'mongodb';
import { Product } from 'src/common/integrations/mongodb/mongodb.interfaces';
import sharp from 'sharp';

export const createProductScene = (products: Collection<Product>) => {
  let fullPhotos = [];
  let compressPhotos = [];

  return async function (conversation: AppConversation, ctx: IAppContext) {
    await ctx.reply('Введите тип товара (Кроссовки)');
    const typeTitle = await conversation.waitFor('message:text');

    await ctx.reply('Введите название бренда (Nike)');
    const brandTitle = await conversation.waitFor('message:text');

    await ctx.reply('Введите размерную сетку (EU)');
    const sizeGridTitle = await conversation.waitFor('message:text');

    await ctx.reply('Введите название товара');
    const titleTitle = await conversation.waitFor('message:text');

    await ctx.reply('Это "Экспресс" товар? (Да / Нет)');
    const inStockTitle = await conversation.waitFor('message:text');

    await ctx.reply('Это "Новинка" товар? (Да / Нет)');
    const isNewTitle = await conversation.waitFor('message:text');

    await ctx.reply('Это "Популярно" товар? (Да / Нет)');
    const isSaleTitle = await conversation.waitFor('message:text');

    await ctx.reply('Показать товар пользователям? (Да / Нет)');
    const isHiddenTitle = await conversation.waitFor('message:text');
    let weight = 0;
    let length = 0;
    let width = 0;
    let height = 0;
    let fullPreviewName = '';
    let compressPreviewName = '';
    let compressfile_id = '';

    do {
      await ctx.reply(
        'Какой вес у товара (писать цифру в граммах)\n\n 1000г = 1кг',
      );
      ctx = await conversation.wait();

      if (!isNaN(parseInt(ctx.message.text))) {
        weight = parseInt(ctx.message.text);
      }
    } while (isNaN(parseInt(ctx.message.text)));

    do {
      await ctx.reply('Какая ширина (писать цифру в см)');
      ctx = await conversation.wait();

      if (!isNaN(parseInt(ctx.message.text))) {
        width = parseInt(ctx.message.text);
      }
    } while (isNaN(parseInt(ctx.message.text)));

    do {
      await ctx.reply('Какая длина (писать цифру в см)');
      ctx = await conversation.wait();

      if (!isNaN(parseInt(ctx.message.text))) {
        length = parseInt(ctx.message.text);
      }
    } while (isNaN(parseInt(ctx.message.text)));

    do {
      await ctx.reply('Какая высота (писать цифру в см)');
      ctx = await conversation.wait();

      if (!isNaN(parseInt(ctx.message.text))) {
        height = parseInt(ctx.message.text);
      }
    } while (isNaN(parseInt(ctx.message.text)));

    do {
      await ctx.reply(
        'Отправте сюда превью товара (В виде документа, без сжатия)',
      );
      ctx = await conversation.wait();

      if (ctx.message?.document) {
        const full = ctx.message?.document;
        const api = new TelegramAPI();
        const fullURI = await api.getFileURI(full.file_id);
        const buffer = await (await fetch(fullURI)).arrayBuffer();
        await writeFile(
          join(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            'static',
            fullURI.split('/').at(-1),
          ),
          Buffer.from(buffer),
        );

        fullPreviewName = fullURI.split('/').at(-1);
        compressfile_id = full.file_id;

        try {
          const metadata = await sharp(buffer).metadata();
          await sharp(buffer)
            .resize({
              width: +((metadata?.width || 0) / 2).toFixed(0) || 300,
              height: +((metadata?.height || 0) / 2).toFixed(0) || 300,
            })
            .toFile(
              join(
                __dirname,
                '..',
                '..',
                '..',
                '..',
                'static',
                '2__' + fullURI.split('/').at(-1),
              ),
            );

          compressPreviewName = '2__' + fullURI.split('/').at(-1);
        } catch (err) {
          console.log(err);
          await ctx.reply('Ошибка при сжатии');
          return;
        }
      }
    } while (!ctx.message?.document);

    do {
      if (ctx.message?.text === '/next') {
        break;
      }

      if (fullPhotos.length > 0) {
        await ctx.reply('Фото загружено');
      } else {
        await ctx.reply(
          'Отправте остальные фото товара (В виде документа, без сжатия)\n\nДля продолжения введите /next',
        );
      }

      ctx = await conversation.wait();

      if (ctx.message?.document) {
        const doc = ctx.message?.document;
        const api = new TelegramAPI();
        const fullURI = await api.getFileURI(doc.file_id);
        const buffer = await (await fetch(fullURI)).arrayBuffer();
        await writeFile(
          join(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            'static',
            fullURI.split('/').at(-1),
          ),
          Buffer.from(buffer),
        );

        fullPhotos.push(fullURI.split('/').at(-1));

        try {
          const metadata = await sharp(buffer).metadata();
          sharp(buffer)
            .resize({
              width: +((metadata?.width || 0) / 2).toFixed(0) || 300,
              height: +((metadata?.height || 0) / 2).toFixed(0) || 300,
            })
            .toFile(
              join(
                __dirname,
                '..',
                '..',
                '..',
                '..',
                'static',
                '2__' + fullURI.split('/').at(-1),
              ),
            );

          compressPhotos.push('2__' + fullURI.split('/').at(-1));
        } catch (err) {
          await ctx.reply('Ошибка при сжатии');
          return;
        }
      }
    } while (ctx.message?.text !== '/next');

    const { insertedId } = await products.insertOne({
      _id: new ObjectId(),
      created_at: new Date(),
      type: typeTitle.msg.text,
      brand: brandTitle.msg.text,
      title: titleTitle.msg.text,
      size_grid: sizeGridTitle.msg.text,
      preview: fullPreviewName,
      preview_compress: compressPreviewName,
      photos: Array.from(new Set(fullPhotos)),
      photos_compress: Array.from(new Set(compressPhotos)),
      discount: 0,
      status: {
        is_hidden:
          isHiddenTitle.msg.text.toLocaleLowerCase() === 'да' ? false : true,
        in_stock: inStockTitle.msg.text.toLocaleLowerCase() === 'да',
        is_new: isNewTitle.msg.text.toLocaleLowerCase() === 'да',
        is_sale: isSaleTitle.msg.text.toLocaleLowerCase() === 'да',
      },
      similar: [],
      sizes: [],
      package: {
        height,
        length,
        weight,
        width,
      },
    });

    return await ctx.replyWithDocument(compressfile_id, {
      caption: `
✅ Товар добавлен!

${
  isHiddenTitle.msg.text.toLocaleLowerCase() === 'да'
    ? '📢 Этот товар виден всем пользователям!'
    : '❗️ Этот товар скрыт от пользователей!'
}

id: ${insertedId}
Тип: ${typeTitle.msg.text}
Бренд: ${brandTitle.msg.text}
Размерная сетка: ${sizeGridTitle.msg.text}
Название: ${titleTitle.msg.text}

Статусы:
Экспресс   - ${inStockTitle.msg.text.toLocaleLowerCase() === 'да' ? '✅' : '❌'}
Новинка    - ${isNewTitle.msg.text.toLocaleLowerCase() === 'да' ? '✅' : '❌'}
Популярный - ${isSaleTitle.msg.text.toLocaleLowerCase() === 'да' ? '✅' : '❌'}
Размеры упаковки:
Ширина - ${width}
Высота - ${height}
Длина - ${length}

Вес упаковки: ${weight}гм

Всего фото: ${compressPhotos.length}
${(compressPhotos = [])}
${(fullPhotos = [])}
  `,
    });
  };
};
