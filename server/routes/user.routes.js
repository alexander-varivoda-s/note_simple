const passport = require('koa-passport');
const Router = require('koa-router');
const UsersController = require('../controllers/user.controller');

const router = new Router();
router.prefix('/users');
router.post('/login', passport.authenticate('local'), UsersController.login());
router.post('/', UsersController.createUser());
router.get('/verify/:token', UsersController.verifyEmail());

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
