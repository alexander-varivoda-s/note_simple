const Router = require('koa-router');
const RefreshTokenController = require('../controllers/refresh-token.controller');

const router = new Router();
router.post('/refresh-token', RefreshTokenController.refresh());

module.exports = router.routes();
