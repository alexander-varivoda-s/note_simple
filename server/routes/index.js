const Router = require('koa-router');

const router = new Router();

router.use(require('./user.routes'));
router.use(require('./note.routes'));
router.use(require('./note-revision.routes'));
router.use(require('./tag.routes'));

module.exports = router;
