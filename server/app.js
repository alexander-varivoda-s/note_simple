const fs = require('fs');
const Koa = require('koa');

const router = require('./routes');

const app = new Koa();

const middlewareDir = `${__dirname}/middleware`;
const middleware = fs.readdirSync(middlewareDir);
middleware
  .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
  .forEach(middleware => {
    const fn = require(`${middlewareDir}/${middleware}`);
    if (typeof fn === 'function') {
      fn(app);
    }
  });

app.use(router.routes());

module.exports = app;
