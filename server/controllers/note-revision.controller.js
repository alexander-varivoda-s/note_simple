const Revision = require('../models/note-revision');

module.exports = {
  getRevisions() {
    return async ctx => {
      ctx.body = {
        revisions: await Revision.find({ note: ctx.state.note.id })
          .sort({ created: 1 })
          .exec(),
      };
    };
  },
};
