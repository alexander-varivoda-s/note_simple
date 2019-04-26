const Router = require('koa-router');

const Note = require('../models/note');
const RevisionsController = require('../controllers/note-revision.controller');

const router = new Router();
router.prefix('/revisions');

router.param('note', async (id, ctx, next) => {
  if (!ctx.isAuthenticated()) {
    ctx.throw(401);
  }

  ctx.state.note = await Note.findOne({
    _id: id,
    author: ctx.state.user.id,
  }).exec();

  if (!ctx.state.note) {
    ctx.throw(404, `Note with id "${id}" does not exist.`);
  }

  await next();
});

router.get('/:note', RevisionsController.getRevisions());

module.exports = router.routes();
