const cors = require('@koa/cors');

module.exports = app =>
  app.use(
    cors({
      origin: 'http://localhost:3000',
      allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      allowHeaders: [
        'Origin',
        'X-Requested-By',
        'Content-Type',
        'Accept',
        'Authorization',
      ],
      credentials: true,
    })
  );
