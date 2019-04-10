const http = require('http');
const config = require('config');
const mongoose = require('mongoose');
const app = require('./app');

const { port, host } = config.get('server');
const server = http.createServer(app.callback());

server.listen(port, host, () => {
  console.log(`Server is running on ${host}:${port}`);
});

const cb = () => {
  if (cb.executed) return;

  server.close(err => {
    if (err) {
      console.error('Error: ', err);
    } else {
      console.log('Server is stopped due to app termination');

      if (mongoose.connection.readyState === 1) {
        mongoose
          .disconnect()
          .then(() => {
            console.log('MongoDB connections closed due to app termination.');
          })
          .catch(err => {
            console.error('Error: ', err);
          });
      }
    }
  });

  cb.executed = true;
};

process.on('SIGTERM', cb);
process.on('SIGINT', cb);
