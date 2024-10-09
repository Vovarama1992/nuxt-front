import { Middleware } from 'grammy';

export const auth: Middleware = (ctx, next) => {
  if (![799014213, 5556527435, 5901501866].includes(ctx.from.id)) return;
  next();
};
