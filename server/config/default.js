module.exports = {
  server: {
    port: 4000,
    host: 'localhost',
  },
  database: {
    name: 'notesimple',
    host: 'localhost',
    port: 27017,
  },
  crypto: {
    passwordLength: 6,
    saltLength: 128,
    iterations: process.env === 'production' ? 10000 : 1,
    keylen: 512,
    digest: 'sha512',
  },
  accessToken: {
    secret: 'CzNHWtZkIDGqwI+38PQmGI8GupKY6Mmw',
    lifespan: 3600,
    algorithm: 'HS512',
  },
  refreshToken: {
    secret: 'Hi1UsFiqxwZMYfsSQazG9AEF9IB02XaI',
    lifespan: 3600 * 24,
    limit: 10,
    algorithm: 'HS512',
  },
  mailer: {
    transport: 'gmail',
    gmail: {
      user: 'alexander.varivoda.s@gmail.com',
      pass: '',
    },
    senders: {
      default: {
        fromEmail: 'example@email.com',
        fromName: 'Note Simple',
      },
    },
  },
};
