const Router = require('koa-router');

const { passportAuthHandler } = require('../utils/auth');
const Note = require('../models/note');
const RevisionsController = require('../controllers/note-revision.controller');

const router = new Router();
router.use(passportAuthHandler('jwt'));
router.prefix('/api/revisions');

router.param('note', async (id, ctx, next) => {
  const note = await Note.findOne({
    _id: id,
    author: ctx.state.user.id,
  }).exec();

  if (!note) {
    ctx.throw(404, `Note with id "${id}" does not exist.`);
  }

  ctx.state.note = note;

  await next();
});

router.get('/:note', RevisionsController.getRevisions());

module.exports = router.routes();
