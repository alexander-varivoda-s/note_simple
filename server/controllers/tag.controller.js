const Tag = require('../models/tag');
const omit = '__v';

module.exports = {
  getTags() {
    return async ctx => {
      ctx.body = {
        tags: await Tag.find({ author: ctx.state.user.id }, { __v: 0 }).exec(),
      };
    };
  },

  createTag() {
    return async ctx => {
      const { user } = ctx.state;
      const { name } = ctx.request.body;

      if (!name) {
        ctx.throw(400, 'Tag name is required.');
      }

      const tagName = name.trim();

      const tag = await Tag.findOne({
        name: tagName,
        author: user.id,
      }).exec();

      if (!tag) {
        const newTag = new Tag({
          name: tagName,
          author: user.id,
        });

        await newTag.save();

        ctx.body = {
          tag: newTag.toObject({ omit }),
        };
      } else {
        ctx.throw(409, `Tag "${name}" already exists.`, { tag });
      }
    };
  },

  deleteTag() {
    return async ctx => {
      const { tag } = ctx.state;
      await tag.remove();

      ctx.body = { deleted: tag.id };
    };
  },
};
