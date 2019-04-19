const Router = require('koa-router');
const passport = require('koa-passport');

const NotesController = require('../controllers/note.controller');
const Note = require('../models/note');

const router = new Router();

router.prefix('/notes');
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

const loadParam = (model, name) => async (id, ctx, next) => {
  ctx.state[name] = await model.findById(id).exec();

  if (!ctx.state[name]) {
    ctx.status = 404;
    ctx.body = {
      message: `${name} with id "${id}" does not exist.`,
    };
  } else {
    await next();
  }
};

router.param('note', loadParam(Note, 'note'));

router.get('/', NotesController.getNotes());
router.post('/', NotesController.createNote());
router.patch('/:note', NotesController.updateNote());
router.delete('/', NotesController.clearAll());

module.exports = router.routes();
