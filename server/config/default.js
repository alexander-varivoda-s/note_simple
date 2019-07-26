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
    emailToken: {
      algorithm: 'HS512',
      expiresIn: '1h',
    },
  },
  mailer: {
    transport: 'gmail',
    secret: 'Hi1UsFiqxwZMYfsSQazG9AEF9IB02XaI',
    gmail: {
      user: 'alexander.varivoda.s@gmail.com',
      pass: 'gqtgwywpgcioycwn',
    },
    senders: {
      default: {
        fromEmail: 'example@email.com',
        fromName: 'Note Simple',
      },
    },
  },
  jwt: {
    accessTokenSecret: '&ZW#rBHAc,25K$Gq',
    accessTokenExpiresIn: 3600,
    refreshTokenSecret: '4XK[PvC~m+`6+dT#',
    refreshTokenExpiresIn: 24 * 3600,
    algorithm: 'HS512',
  },
};
