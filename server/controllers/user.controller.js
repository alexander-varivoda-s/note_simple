const config = require('config');
const uuid = require('uuid');

const User = require('../models/user');
const sendEmail = require('../lib/email');
const tokenHelper = require('../utils/jwt-helper');

module.exports = {
  getCurrentUser() {
    return async ctx => {
      const { user } = ctx.state;

      if (user) {
        ctx.body = { user };
      }
    };
  },

  createUser() {
    return async ctx => {
      const token = uuid.v4();
      const { email, password, displayName = '' } = ctx.request.body;

      await User.create({
        displayName,
        email,
        password,
        token,
      });

      await sendEmail({
        to: email,
        subject: 'Registration',
        template: 'registration.email',
        link: `http://${config.get('server.host')}:3000/register/${token}`,
      });

      ctx.body = {
        flash: {
          type: 'status',
          message:
            'You almost registered. To complete registration please check your email inbox.',
        },
      };
    };
  },

  updateUser() {
    return async ctx => {
      const { user } = ctx.state;
      const updatedUser = Object.assign(user, ctx.request.body);

      await updatedUser.save();

      ctx.body = { user: updatedUser };
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
        auth: await tokenHelper.signTokens(user.id),
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
      } else {
        user.password = newPassword;
        await user.save();

        ctx.body = {
          flash: {
            type: 'status',
            message: 'Password successfully updated.',
          },
        };
      }
    };
  },
};
