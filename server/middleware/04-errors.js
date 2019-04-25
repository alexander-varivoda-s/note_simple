module.exports = app =>
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      const errors = [];
      if (e.name === 'ValidationError') {
        Object.keys(e.errors).forEach(fieldName => {
          errors.push({
            type: 'error',
            message: e.errors[fieldName].message,
            field: fieldName,
          });
        });

        ctx.status = 400;
      } else {
        ctx.status = e.status || 500;
        errors.push({
          type: 'error',
          message: e.status === 500 ? 'Internal server error' : e.message,
        });
      }

      ctx.body = errors;
      ctx.app.emit('error', e, ctx);
    }
  });
