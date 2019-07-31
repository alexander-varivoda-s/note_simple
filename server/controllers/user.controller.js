const config = require('config');

const {
  signRefreshToken,
  signAccessToken,
  signEmailVerificationToken,
  decodeEmailVerificationToken,
  signRefreshPasswordToken,
  decodeRefreshPasswordToken,
  decodeRefreshToken,
  decodeAccessToken,
} = require('../utils/jsonwebtoken');
const RefreshToken = require('../models/refresh-token');
const UserModel = require('../models/user');
const sendEmail = require('../libs/email');

const omit =
  'emailVerified salt password_hash verifyEmailToken resetPasswordToken __v';

module.exports = {
  getCurrentUser() {
    return async ctx => {
      const { user } = ctx.state;
      ctx.body = { user: user.toObject({ omit }) };
    };
  },

  createUser() {
    return async ctx => {
      const { email, password, displayName = '' } = ctx.request.body;
      const emailVerificationToken = await signEmailVerificationToken(email);

      const user = await UserModel.create({
        displayName,
        email,
        password,
        verifyEmailToken: emailVerificationToken,
      });

      await sendEmail({
        to: email,
        subject: 'Registration',
        template: 'registration.email',
        link: `http://${config.get(
          'server.host'
        )}:3000/verify/${emailVerificationToken}`,
      });

      ctx.body = {
        user: user.toObject({ omit }),
      };
    };
  },

  deleteUser() {
    return async ctx => {
      const { user } = ctx.state;
      const { password } = ctx.request.body;

      if (!user.validatePassword(password)) {
        ctx.throw(400, 'Invalid password specified.');
      }
      ctx.logout();

      await user.remove();
      ctx.body = { deleted: user.id };
    };
  },

  login() {
    return async ctx => {
      const { user } = ctx.state;
      const accessToken = await signAccessToken(user.id);
      const { exp: expiresIn } = await decodeAccessToken(accessToken);
      const refreshToken = await signRefreshToken(user.id);

      const refreshTokenEntity = new RefreshToken({
        token: refreshToken,
        user: user.id,
      });

      await refreshTokenEntity.save();

      ctx.body = {
        user: user.toObject({ omit }),
        accessToken,
        expiresIn,
        refreshToken,
      };
    };
  },

  updateEmail() {
    return async ctx => {
      const { user } = ctx.state;
      const { email, password } = ctx.request.body;

      if (!user.validatePassword(password)) {
        ctx.throw(400, 'Invalid password specified.');
      } else {
        user.email = email;
        await user.save();

        ctx.body = {
          type: 'status',
          message: 'Email successfully updated.',
          user: user.toObject({ omit }),
        };
      }
    };
  },

  updatePassword() {
    return async ctx => {
      const { user } = ctx.state;
      const { oldPassword, newPassword } = ctx.request.body;

      if (!user.validatePassword(oldPassword)) {
        ctx.throw(400, 'Invalid password specified.');
      }

      user.password = newPassword;
      await user.save();

      ctx.body = {
        type: 'status',
        message: 'Password successfully updated.',
      };
    };
  },

  verifyEmail() {
    return async ctx => {
      const { token } = ctx.params;
      const { exp, email } = await decodeEmailVerificationToken(token);
      const user = await UserModel.findOne({
        email,
        verifyEmailToken: token,
      }).exec();

      if (!user) {
        ctx.throw(400, 'Invalid token specified or account does not exist.');
      }

      if (Date.now() / 1000 > exp && !user.emailVerified) {
        await UserModel.deleteOne({ email }).exec();
        ctx.throw(400, 'Token already expired.');
      }

      if (user.emailVerified) {
        ctx.throw(400, 'Account already verified.');
      }

      user.emailVerified = true;
      user.verifyEmailToken = undefined;
      await user.save();

      ctx.body = {
        type: 'status',
        message: 'Account successfully verified',
      };
    };
  },

  forgotPassword() {
    return async ctx => {
      const { email } = ctx.request.body;

      const user = await UserModel.findOne({ email }).exec();

      if (!user) {
        ctx.throw(400, 'Account does not exist.');
      }

      const token = await signRefreshPasswordToken(user);

      user.resetPasswordToken = token;
      await user.save();

      await sendEmail({
        to: email,
        subject: 'Simplenote Password Reset',
        template: 'reset.email',
        link: `http://${config.get(
          'server.host'
        )}:3000/password/${token}/reset`,
      });

      ctx.body = {
        type: 'status',
        message: 'Email with instructions has been sent.',
      };
    };
  },

  resetPassword() {
    return async ctx => {
      const { token, password } = ctx.request.body;
      const user = await UserModel.findOne({
        resetPasswordToken: token,
      }).exec();

      if (!user) {
        ctx.throw(400, 'Invalid reset password token specified.');
      }

      await decodeRefreshPasswordToken(token, user);

      user.password = password;
      user.resetPasswordToken = undefined;
      await user.save();

      ctx.body = {
        type: 'status',
        messages: 'Password successfully reset.',
      };
    };
  },

  refreshToken() {
    return async ctx => {
      const { refreshToken } = ctx.request.body;
      const { sub: userId, exp } = await decodeRefreshToken(refreshToken);
      const refreshTokenEntity = await RefreshToken.findOne({
        user: userId,
        token: refreshToken,
      }).exec();

      if (!refreshTokenEntity) {
        ctx.throw(401, 'Invalid refresh token specified');
      }

      if (exp < Date.now() / 1000) {
        ctx.throw(401, 'Refresh token already expired');
      }

      const newRefreshTokenEntity = new RefreshToken({
        user: userId,
        token: await signRefreshToken(userId),
      });

      await newRefreshTokenEntity.save();

      const accessToken = await signAccessToken(userId);
      const { exp: expiresIn } = await decodeAccessToken(accessToken);

      ctx.body = {
        accessToken,
        expiresIn,
        refreshToken: await signRefreshToken(userId),
      };
    };
  },
};
