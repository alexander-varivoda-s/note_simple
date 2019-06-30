const passport = require('koa-passport');
const Router = require('koa-router');
const UsersController = require('../controllers/user.controller');

const omit =
  'emailVerified salt password_hash verifyEmailToken resetPasswordToken __v';

const router = new Router();
router.prefix('/api/users');
router.post('/login', async (ctx, next) => {
  await passport.authenticate('local', async (err, user, info) => {
    if (err) {
      ctx.throw(err);
    } else if (user === false) {
      ctx.throw(400, 'Invalid email or password entered.');
    }

    try {
      await ctx.logIn(user);
    } catch (e) {
      ctx.throw(401, 'Log in failed.', e);
    }

    ctx.body = {
      user: user.toObject({ omit }),
    };
  })(ctx, next);
});
router.post('/', UsersController.createUser());
router.get('/verify/:token', UsersController.verifyEmail());
router.post('/forgot-password', UsersController.forgotPassword());
router.post('/reset-password', UsersController.resetPassword());

router.use(async (ctx, next) => {
  if (!ctx.isAuthenticated()) {
    ctx.throw(401);
  }

  await next();
});

router.get('/', UsersController.getCurrentUser());
router.get('/logout', UsersController.logout());
router.delete('/', UsersController.deleteUser());
router.patch('/update-email', UsersController.updateEmail());
router.patch('/update-password', UsersController.updatePassword());

module.exports = router.routes();
