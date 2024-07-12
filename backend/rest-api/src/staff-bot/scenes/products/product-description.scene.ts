import { AppConversation, IAppContext } from '../../context/context.interface';
import { Collection, ObjectId } from 'mongodb';
import { Product } from 'src/common/integrations/mongodb/mongodb.interfaces';
import { ParseModeFlavor } from '@grammyjs/parse-mode';

export const DESCRIPTION_PRODUCT_SCENE = 'description-product-scene';

export const descriptionProductScene = (products: Collection<Product>) => {
  return async function (
    conversation: AppConversation,
    ctx: ParseModeFlavor<IAppContext>,
  ) {
    await ctx.reply(ctx.session.selectedProdutId?.toString() || 'lol');
  };
};
