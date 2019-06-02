const mongoose = require('../libs/mongoose');
const config = require('config');

const { host, port, name } = config.get('database');

module.exports = app =>
  app.use(
    mongoose.middleware({
      host,
      port,
      name,
      config: {
        useCreateIndex: true,
        useNewUrlParser: true,
      },
    })
  );
