const session = require('koa-session');
const MongooseStore = require('koa-session-mongoose');
const config = require('config');

const { key, maxAge } = config.get('session');

console.log(maxAge);

module.exports = app => {
  app.keys = [key];
  app.use(
    session(
      {
        store: new MongooseStore({
          connection: require('../libs/mongoose'),
        }),
        maxAge,
        rolling: true,
      },
      app,
    ),
  );
};
