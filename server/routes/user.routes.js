const Router = require('koa-router');
const UsersController = require('../controllers/user.controller');
const { passportAuthHandler } = require('../utils/auth');

const router = new Router();
router.prefix('/api/users');
router.post(
  '/login',
  passportAuthHandler('local', '400', 'Invalid email or password entered.'),
  UsersController.login()
);
router.post('/', UsersController.createUser());
router.get('/verify/:token', UsersController.verifyEmail());
router.post('/forgot-password', UsersController.forgotPassword());
router.post('/reset-password', UsersController.resetPassword());
router.post('/refresh-token', UsersController.refreshToken());

router.use(passportAuthHandler('jwt'));

router.get('/', UsersController.getCurrentUser());
router.delete('/', UsersController.deleteUser());
router.patch('/update-email', UsersController.updateEmail());
router.patch('/update-password', UsersController.updatePassword());

module.exports = router.routes();
