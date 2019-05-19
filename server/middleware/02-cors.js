const cors = require('@koa/cors');

module.exports = app =>
  app.use(
    cors({
      origin: 'http://localhost:3000',
      allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      allowHeader: ['Origin', 'X-Request-With', 'Content-Type', 'Accept'],
      credentials: true,
    }),
  );
