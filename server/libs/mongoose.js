const mongoose = require('mongoose');
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation');

module.exports = mongoose;

module.exports.middleware = function(settings) {
  const {
    host,
    port,
    name,
    uri,
    user,
    pass,
    config = {},
    events = {},
  } = settings;

  if ((!host || !port || !name) && !uri) {
    const err = new Error('Missing required options.');
    err.status = 400;
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

  mongoose
    .connect(dbUri, config)
    .then(() => {
      mongoose.plugin(mongooseBeautifulUniqueValidation);
      console.log(`MongoDB is running on mongodb://${host}:${port}/${name}`);
    })
    .catch(e => {
      console.log(e.message);
    });

  return async (ctx, next) => {
    await next();
  };
};
