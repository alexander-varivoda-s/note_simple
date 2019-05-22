module.exports = app =>
  app.use(async (ctx, next) => {
    if (!ctx.get('x-requested-by')) {
      ctx.throw(403);
    }

    await next();
  });
