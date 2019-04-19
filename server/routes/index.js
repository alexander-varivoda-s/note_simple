const Router = require('koa-router');

const router = new Router();

router.use(require('./refresh-token.routes'));
router.use(require('./registration.routes'));
router.use(require('./user.routes'));

module.exports = router;
