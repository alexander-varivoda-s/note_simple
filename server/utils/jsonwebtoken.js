const jwt = require('jsonwebtoken');
const config = require('config');

async function signToken(payload, secret, options = {}) {
  return await new Promise((resolve, reject) =>
    jwt.sign(payload, secret, options, (err, jwt) => {
      if (err) {
        reject(err);
      } else {
        resolve(jwt);
      }
    })
  );
}

async function verifyToken(token, secret, options = {}) {
  return await new Promise((resolve, reject) => {
    jwt.verify(token, secret, options, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

module.exports = {
  async signAccessToken(userId) {
    const {
      accessTokenSecret,
      algorithm,
      accessTokenExpiresIn: expiresIn,
    } = config.get('jwt');

    return await signToken({ sub: userId }, accessTokenSecret, {
      algorithm,
      expiresIn,
    });
  },

  async decodeAccessToken(token) {
    const { accessTokenSecret, algorithm } = config.get('jwt');

    return await verifyToken(token, accessTokenSecret, { algorithm });
  },

  async signRefreshToken(userId) {
    const {
      refreshTokenSecret,
      algorithm,
      refreshTokenExpiresIn: expiresIn,
    } = config.get('jwt');

    return await signToken({ sub: userId }, refreshTokenSecret, {
      algorithm,
      expiresIn,
    });
  },

  async decodeRefreshToken(token) {
    const { refreshTokenSecret, algorithm } = config.get('jwt');

    return await verifyToken(token, refreshTokenSecret, {
      algorithm,
      ignoreExpiration: true,
    });
  },

  async signEmailVerificationToken(email) {
    const { secret } = config.get('mailer');
    const { algorithm, expiresIn } = config.get('crypto.emailToken');
    return await signToken({ email }, secret, {
      algorithm,
      expiresIn,
    });
  },

  async decodeEmailVerificationToken(token) {
    const { secret } = config.get('mailer');
    const { algorithm } = config.get('crypto.emailToken');
    return await verifyToken(token, secret, {
      algorithm,
      ignoreExpiration: true,
    });
  },

  async signRefreshPasswordToken(user) {
    const secret = user.password_hash + user.created;
    return await signToken({ sub: user.email }, secret, {
      expiresIn: '30m',
    });
  },

  async decodeRefreshPasswordToken(token, user) {
    const secret = user.password_hash + user.created;
    return await verifyToken(token, secret);
  },
};
