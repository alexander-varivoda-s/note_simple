const Revision = require('../models/note-revision');

module.exports = {
  getRevisions() {
    return async ctx => {
      const { note } = ctx.state;
      ctx.body = {
        revisions: await Revision.find({ note: note.id }, { __v: 0 })
          .sort({ created: 1 })
          .exec(),
      };
    };
  },
};
