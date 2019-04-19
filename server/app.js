const Koa = require('koa');
const config = require('config');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const errorsMiddleware = require('./middleware/errors');
const mongooseMiddleware = require('./middleware/mongoose');
const passportMiddleware = require('./middleware/passport');

const router = require('./routes');

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
app.use(bodyParser());
app.use(passportMiddleware.initialize());
app.use(router.routes());

module.exports = app;
