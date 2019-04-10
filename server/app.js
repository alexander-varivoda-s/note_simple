const Koa = require('koa');
const config = require('config');
const cors = require('@koa/cors');

const errorsMiddleware = require('./middleware/errors');
const mongooseMiddleware = require('./middleware/mongoose');

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
app.use(
  mongooseMiddleware({
    host: config.get('database.host'),
    port: config.get('database.port'),
    name: config.get('database.name'),
    config: {
      useNewUrlParser: true,
      useCreateIndex: true,
    },
  }),
);

module.exports = app;
