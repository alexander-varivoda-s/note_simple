const Router = require('koa-router');
const passport = require('koa-passport');

const Tag = require('../models/tag');
const TagsController = require('../controllers/tag.controller');

const router = new Router();
router.prefix('/tags');

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

router.param('tag', async (id, ctx, next) => {
  ctx.state.tag = await Tag.findOne({
    _id: id,
    author: ctx.state.user.id,
  }).exec();

  if (!ctx.state.tag) {
    ctx.throw(404, 'Tag does not exists or not owned by current user.');
  } else {
    await next();
  }
});

router.get('/', TagsController.getTags());
router.post('/', TagsController.createTag());
router.delete('/:tag', TagsController.deleteTag());

module.exports = router.routes();
