const jwt = require('jsonwebtoken');

module.exports = {
  async signToken(payload, secret, options = {}) {
    return await new Promise((resolve, reject) =>
      jwt.sign(payload, secret, options, (err, jwt) => {
        if (err) {
          reject(err);
        } else {
          resolve(jwt);
        }
      }),
    );
  },

  async verifyToken(token, secret, options = {}) {
    return await new Promise((resolve, reject) => {
      jwt.verify(token, secret, options, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  },
};
