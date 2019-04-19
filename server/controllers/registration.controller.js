module.exports = {
  confirmRegistration() {
    return async (ctx, next) => {
      const { user } = ctx.state;
      if (user.confirmed === false) {
        user.confirmed = true;
        await user.save();
      } else {
        ctx.throw(400, 'Account already verified.');
      }

      await next();
    };
  },
};
