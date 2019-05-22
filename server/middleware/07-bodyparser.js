const bodyparser = require('koa-bodyparser');

module.exports = app => app.use(bodyparser());
