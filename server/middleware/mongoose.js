const mongoose = require('mongoose');

module.exports = function middleware({
  host,
  port,
  name,
  uri,
  user,
  pass,
  config = {},
  events = {},
} = {}) {
  if ((!host || !port || !name) && !uri) {
    const err = new Error('Missing required options.');
    e.status = 400;
    throw err;
  }

  const dbUri =
    uri ||
    `mongodb://${
      user && pass ? `${user}:${pass}@` : ''
    }${host}:${port}/${name}`;
  mongoose.Promise = Promise;

  Object.keys(events).forEach(event => {
    mongoose.connection.on(event, events[event]);
  });

  mongoose.connect(dbUri, config).then(() => {
    console.log(`MongoDB is running on mongodb://${host}:${port}/${name}`);
  });

  return async (ctx, next) => {
    await next();
  };
};
