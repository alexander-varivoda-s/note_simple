const passport = require('koa-passport');
const Router = require('koa-router');
const UsersController = require('../controllers/user.controller');

const router = new Router();
router.prefix('/users');

router.get('/', isAuthenticated, UsersController.getCurrentUser());
router.get('/verify/:token', UsersController.verifyEmail());
router.get('/logout', isAuthenticated, UsersController.logout());
router.post('/', UsersController.createUser());
router.post('/login', passport.authenticate('local'), UsersController.login());
router.delete('/', isAuthenticated, UsersController.deleteUser());
router.patch('/update-email', isAuthenticated, UsersController.updateEmail());
router.patch(
  '/update-password',
  isAuthenticated,
  UsersController.updatePassword(),
);

async function isAuthenticated(ctx, next) {
  if (ctx.isAuthenticated()) {
    await next();
  } else {
    ctx.throw(401);
  }
}

module.exports = router.routes();
