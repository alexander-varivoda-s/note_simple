const session = require('koa-session');
const MongooseStore = require('koa-session-mongoose');
const config = require('config');

const { key } = config.get('session');

module.exports = app => {
  app.keys = [key];
  app.use(
    session(
      {
        store: new MongooseStore({
          connection: require('../libs/mongoose'),
        }),
        rolling: true,
      },
      app,
    ),
  );
};
