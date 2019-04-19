const Note = require('../models/note');
const Revision = require('../models/note-revision');

module.exports = {
  getNotes() {
    return async ctx => {
      ctx.body = {
        notes: await Note.find({ author: ctx.state.user.id }).exec(),
      };
    };
  },

  createNote() {
    return async ctx => {
      const note = new Note(ctx.request.body);
      await note.save();

      ctx.body = {
        note,
      };
    };
  },

  updateNote() {
    return async ctx => {
      if (!ctx.request.body) {
        ctx.throw(400, 'Nothing to update, request body is empty.');
      }

      const { note } = ctx.state;
      const { text, is_deleted } = ctx.request.body;
      let revision = null;

      if (text === note.text && is_deleted === note.is_deleted) {
        ctx.throw(400, 'Note is already up to date.');
      }

      if (typeof text !== 'undefined') {
        revision = new Revision({
          note: note.id,
          text: note.text,
        });
        note.text = text;
      }

      if (typeof is_deleted !== 'undefined') {
        note.is_deleted = is_deleted;
      }

      await note.save();

      if (revision) {
        await revision.save();
      }

      ctx.body = {
        note,
      };
    };
  },

  clearAll() {
    return async ctx => {
      const { user } = ctx.state;
      const notes = await Note.find(
        {
          is_deleted: true,
          author: user.id,
        },
        { _id: 1 },
      ).exec();

      await Promise.all(notes.map(note => note.remove()));

      ctx.body = {
        deleted: notes.map(note => note._id),
      };
    };
  },
};
