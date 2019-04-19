const passport = require('koa-passport');
const Router = require('koa-router');
const UsersController = require('../controllers/user.controller');

const customAuthHandler = (
  strategy = 'jwt',
  errCode = 401,
  message = 'Unauthorized.',
) => async (ctx, next) => {
  try {
    await passport.authenticate(
      strategy,
      { session: false },
      async (err, user, info) => {
        if (err) {
          ctx.throw(err);
        } else if (user === false) {
          console.error(info);
          ctx.throw(errCode, message);
        }

        ctx.state.user = user;
        await next();
      },
    )(ctx, next);
  } catch (err) {
    ctx.throw(err);
  }
};

const router = new Router();
router.prefix('/users');

router.get('/', customAuthHandler(), UsersController.getCurrentUser());
router.post('/', UsersController.createUser());
router.post(
  '/login',
  customAuthHandler('local', 400, 'Incorrect password or email entered.'),
  UsersController.login(),
);
router.patch('/', customAuthHandler(), UsersController.updateUser());
router.delete('/', customAuthHandler(), UsersController.deleteUser());
router.patch(
  '/update-email',
  customAuthHandler(),
  UsersController.updateEmail(),
);
router.patch(
  '/update-password',
  customAuthHandler(),
  UsersController.updatePassword(),
);

module.exports = router.routes();
