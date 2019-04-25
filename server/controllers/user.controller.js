const config = require('config');

const jwt = require('../utils/jsonwebtoken');
const UserModel = require('../models/user');
const sendEmail = require('../libs/email');

const jwtSecret = config.get('mailer.secret');

module.exports = {
  getCurrentUser() {
    return async ctx => {
      const { user } = ctx.state;
      ctx.body = { user };
    };
  },

  createUser() {
    return async ctx => {
      const { email, password, displayName = '' } = ctx.request.body;
      const payload = {
        sub: email,
      };
      const options = {
        algorithm: 'HS512',
        expiresIn: '1h',
      };

      const jwtToken = await jwt.signToken(payload, jwtSecret, options);

      await UserModel.create({
        displayName,
        email,
        password,
        verifyEmailToken: jwtToken,
      });

      await sendEmail({
        to: email,
        subject: 'Registration',
        template: 'registration.email',
        link: `http://${config.get('server.host')}:3000/verify/${jwtToken}`,
      });

      ctx.body = {
        flash: {
          type: 'status',
          message: 'Please check you email inbox to complete registration.',
        },
      };
    };
  },

  deleteUser() {
    return async ctx => {
      const { user } = ctx.state;
      await user.remove();
      ctx.body = { deleted: user.id };
    };
  },

  login() {
    return async ctx => {
      const { user } = ctx.state;

      ctx.body = {
        user,
      };
    };
  },

  logout() {
    return async ctx => {
      ctx.logout();

      ctx.body = {
        message: 'Log out succeeded.',
      };
    };
  },

  updateEmail() {
    return async ctx => {
      const { user } = ctx.state;

      const {
        data: { email, password },
      } = ctx.request.body;

      if (!user.validatePassword(password)) {
        ctx.throw(400, 'Invalid password specified.');
      } else {
        user.email = email;
        await user.save();

        ctx.body = {
          flash: {
            type: 'status',
            message: 'Email successfully updated.',
          },
        };
      }
    };
  },

  updatePassword() {
    return async ctx => {
      const { user } = ctx.state;
      const {
        data: { oldPassword, newPassword },
      } = ctx.request.body;

      if (!user.validatePassword(oldPassword)) {
        ctx.throw(400, 'Invalid password specified.');
      }

      user.password = newPassword;
      await user.save();

      ctx.body = {
        flash: {
          type: 'status',
          message: 'Password successfully updated.',
        },
      };
    };
  },

  verifyEmail() {
    return async ctx => {
      const { token } = ctx.params;
      const options = {
        algorithm: 'HS512',
        ignoreExpiration: true,
      };
      const { exp, sub } = await jwt.verifyToken(token, jwtSecret, options);
      const timestamp = Date.now() / 1000;
      const user = await UserModel.findOne({
        email: sub,
        verifyEmailToken: token,
      }).exec();

      if (!user) {
        ctx.throw(400, 'Invalid token specified or account does not exist.');
      }

      if (timestamp > exp && !user.emailVerified) {
        await UserModel.deleteOne({ email: sub }).exec();
        ctx.throw(401, 'Token already expired.');
      }

      if (user.emailVerified) {
        ctx.throw(400, 'Email already confirmed.');
      }

      user.emailVerified = true;
      await user.save();

      ctx.body = {
        flash: {
          message:
            'Email successfully confirmed, please use your email and password to login',
        },
      };
    };
  },
};
