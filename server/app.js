const Koa = require('koa');
const cors = require('@koa/cors');

const errorsMiddleware = require('./middleware/errors');

const app = new Koa();

app.use(errorsMiddleware());
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

module.exports = app;
