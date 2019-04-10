const Koa = require('koa');

const errorsMiddleware = require('./middleware/errors');

const app = new Koa();

app.use(errorsMiddleware());

module.exports = app;
