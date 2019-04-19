const Router = require('koa-router');
const passport = require('koa-passport');

const Note = require('../models/note');
const RevisionsController = require('../controllers/note-revision.controller');

const router = new Router();
router.prefix('/revisions');

router.use('/', async (ctx, next) => {
  try {
    await passport.authenticate(
      'jwt',
      { session: false },
      async (err, user, info) => {
        if (err) {
          ctx.throw(err);
        } else if (user === false) {
          ctx.throw(401, 'Unauthorized.');
        }

        ctx.state.user = user;
        await next();
      },
    )(ctx, next);
  } catch (err) {
    ctx.throw(err);
  }
});

router.param('note', async (id, ctx, next) => {
  ctx.state.note = await Note.findOne({
    _id: id,
    author: ctx.state.user.id,
  }).exec();

  if (!ctx.state.note) {
    ctx.throw(404, `Note with id "${id}" does not exist.`);
  } else {
    await next();
  }
});

router.get('/:note', RevisionsController.getRevisions());

module.exports = router.routes();
