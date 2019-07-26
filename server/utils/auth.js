const passport = require('koa-passport');

module.exports = {
  passportAuthHandler: (
    strategy,
    errCode = 401,
    errMessage = 'Unauthorized'
  ) => async (ctx, next) =>
    await passport.authenticate(
      strategy,
      { session: false },
      async (err, user) => {
        if (err) {
          ctx.throw(err);
        } else if (user === false) {
          ctx.throw(errCode, errMessage);
        }

        ctx.state.user = user;
        await next();
      }
    )(ctx, next),
};
