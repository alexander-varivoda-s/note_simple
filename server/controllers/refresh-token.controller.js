const tokenHelper = require('../utils/jwt-helper');

module.exports = {
  refresh() {
    return async ctx => {
      const { refreshToken } = ctx.request.body;
      ctx.body = {
        auth: await tokenHelper.refreshTokens(refreshToken),
      };
    };
  },
};
