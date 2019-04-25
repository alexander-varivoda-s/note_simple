const cors = require('@koa/cors');

module.exports = app =>
  app.use(
    cors({
      origin: '*',
      allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      allowHeader: [
        'Origin',
        'X-Request-With',
        'Content-Type',
        'Authorization',
        'Accept',
      ],
    }),
  );
