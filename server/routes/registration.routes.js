const Router = require('koa-router');
const User = require('../models/user');
const RegistrationController = require('../controllers/registration.controller');
const UsersController = require('../controllers/user.controller');

const router = new Router();

router.param('token', async (token, ctx, next) => {
  ctx.state.user = await User.findOne({ token }).exec();

  if (ctx.state.user === null) {
    ctx.throw(400, 'Invalid registration token specified.');
  } else {
    await next();
  }
});

router.post(
  '/register/:token',
  RegistrationController.confirmRegistration(),
  UsersController.login(),
);

module.exports = router.routes();
