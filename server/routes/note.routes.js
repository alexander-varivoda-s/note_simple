const Router = require('koa-router');

const NotesController = require('../controllers/note.controller');
const Note = require('../models/note');
const Tag = require('../models/tag');

const router = new Router();

router.prefix('/notes');
router.use('/', async (ctx, next) => {
  console.log(ctx.request.headers);
  if (!ctx.isAuthenticated()) {
    ctx.throw(401);
  }

  await next();
});

const load = (model, name) => async (id, ctx, next) => {
  ctx.state[name] = await model
    .findOne({
      _id: id,
      author: ctx.state.user.id,
    })
    .exec();

  if (!ctx.state[name]) {
    ctx.status = 404;
    ctx.body = {
      message: `${name} does not exists or not owned by current user.`,
    };
  } else {
    await next();
  }
};

router.param('note', load(Note, 'note'));
router.param('tag', load(Tag, 'tag'));

router.get('/', NotesController.getNotes());
router.post('/', NotesController.createNote());
router.patch('/:note', NotesController.updateNote());
router.delete('/', NotesController.clearAll());
router.patch('/:note/tag/:tag', NotesController.tagNote());
router.patch('/:note/untag/:tag', NotesController.untagNote());
router.patch('/:note/pin', NotesController.pinNote());
router.patch('/:note/unpin', NotesController.unpinNote());

module.exports = router.routes();
