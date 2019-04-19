const jwt = require('jsonwebtoken');
const config = require('config');

const RefreshTokenModel = require('../models/refresh-token');

class JwtToken {
  constructor(token) {
    this._token = token;
  }

  static async signToken(payload, secret, options = {}) {
    return await new Promise((resolve, reject) =>
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(err);
        }

        resolve(token);
      }),
    );
  }

  static async decodeToken(token, secret, options = {}) {
    return await new Promise((resolve, reject) =>
      jwt.verify(token, secret, options, (err, decoded) => {
        if (err) {
          reject(err);
        }

        resolve(decoded);
      }),
    );
  }

  static isExpired(expiresIn) {
    const timestamp = Date.now();
    return Math.floor(timestamp / 1000) >= expiresIn;
  }

  calculateExpirationDate(lifespan = 0) {
    const timestamp = Date.now();
    return Math.floor(timestamp / 1000) + lifespan;
  }

  toString() {
    return this._token;
  }
}

class AccessToken extends JwtToken {
  constructor(token) {
    super(token);
  }

  static async create(payload, secret, options = {}) {
    const token = await super.signToken(payload, secret, options);
    return new AccessToken(token);
  }
}

class RefreshToken extends JwtToken {
  constructor(token, subject) {
    super(token);
    this._limit = config.get('refreshToken.limit');
    this._subject = subject;
  }

  get subject() {
    return this._subject;
  }

  get limit() {
    return this._limit;
  }

  static async create(payload, secret, options = {}) {
    const token = await super.signToken(payload, secret, options);
    return await new RefreshToken(token, payload.sub);
  }

  static async clearAll(filter) {
    return await RefreshTokenModel.deleteMany(filter).exec();
  }

  static async count(filter = {}) {
    return await RefreshTokenModel.countDocuments(filter).exec();
  }

  async save() {
    if (
      await this.exceedsRefreshTokensLimit(this.limit, { user: this.subject })
    ) {
      await RefreshToken.clearAll({ user: this.subject });
    }

    const entity = new RefreshTokenModel({
      user: this.subject,
      token: this,
    });

    await entity.save();
  }

  async tokenExists() {
    return (
      1 ===
      (await RefreshToken.count({
        user: this.subject,
        token: this._token,
      }))
    );
  }

  async exceedsRefreshTokensLimit(limit = 1) {
    return limit <= (await RefreshToken.count({ user: this.subject }));
  }

  async delete() {
    return await RefreshTokenModel.deleteOne({
      user: this.subject,
      token: this._token,
    }).exec();
  }
}

class TokenHelper {
  async refreshTokens(oldRefreshToken) {
    const { secret } = config.get('refreshToken');
    const decoded = await JwtToken.decodeToken(oldRefreshToken, secret, {
      ignoreExpiration: true,
    });

    const refreshToken = new RefreshToken(oldRefreshToken, decoded.sub);

    if (await refreshToken.tokenExists()) {
      await refreshToken.delete();
      if (JwtToken.isExpired(decoded.exp)) {
        throw new Error('Specified refresh token already expired.');
      }
    } else {
      throw new Error('Invalid refresh token specified.');
    }

    return await this.signTokens(refreshToken.subject);
  }

  async signTokens(subject) {
    const payload = {
      sub: subject,
    };

    const newRefreshToken = await RefreshToken.create(
      payload,
      config.get('refreshToken.secret'),
      {
        algorithm: config.get('refreshToken.algorithm'),
        expiresIn: config.get('refreshToken.lifespan'),
      },
    );

    await newRefreshToken.save();

    const newAccessToken = await AccessToken.create(
      payload,
      config.get('accessToken.secret'),
      {
        algorithm: config.get('accessToken.algorithm'),
        expiresIn: config.get('accessToken.lifespan'),
      },
    );

    return {
      refreshToken: newRefreshToken.toString(),
      accessToken: newAccessToken.toString(),
      expiresIn: newAccessToken.calculateExpirationDate(
        config.get('accessToken.lifespan'),
      ),
    };
  }
}

module.exports = new TokenHelper(RefreshToken, AccessToken);
