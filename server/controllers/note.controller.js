const Note = require('../models/note');
const Revision = require('../models/note-revision');

const omit = '__v';

module.exports = {
  getNotes() {
    return async ctx => {
      const { user } = ctx.state;
      ctx.body = {
        notes: await Note.find({ author: user.id }, { __v: 0 }).exec(),
      };
    };
  },

  createNote() {
    return async ctx => {
      const { user } = ctx.state;
      const { text = '' } = ctx.request.body;

      const note = new Note({
        text,
        author: user.id,
      });

      await note.save();

      ctx.body = {
        note: note.toObject({ omit }),
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

      if (typeof text !== 'undefined' && typeof is_deleted === 'undefined') {
        revision = new Revision({
          note: note.id,
          text: note.text,
        });
        note.text = text;
        note.updated = Date.now();
      }

      if (typeof is_deleted !== 'undefined') {
        note.is_deleted = is_deleted;
      }

      await note.save();

      if (revision) {
        await revision.save();
      }

      ctx.body = {
        note: note.toObject({ omit }),
      };
    };
  },

  deleteNote() {
    return async ctx => {
      const { note } = ctx.state;
      await note.remove();

      ctx.body = {
        deleted: note._id,
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
        { _id: 1 }
      ).exec();

      await Promise.all(notes.map(note => note.remove()));

      ctx.body = {
        deleted: notes.map(note => note._id),
      };
    };
  },

  tagNote() {
    return async ctx => {
      const { note, tag } = ctx.state;
      const tagIds = note.tags.map(oid => oid.toString());

      if (tagIds.indexOf(tag.id) === -1) {
        note.tags.push(tag.id);
        note.updated = Date.now();
        await note.save();
      } else {
        ctx.throw(
          400,
          `Note "${note.id}" already tagged with tag "${tag.id}".`
        );
      }

      ctx.body = {
        note: note.toObject({ omit }),
      };
    };
  },

  untagNote() {
    return async ctx => {
      const { note, tag } = ctx.state;
      const oldLength = note.tags.length;

      note.tags = note.tags.filter(oid => oid.toString() !== tag.id);

      if (note.tags.length === oldLength) {
        ctx.throw(
          400,
          `Note "${note.id}" does not tagged with tag "${tag.id}"`
        );
      }

      note.updated = Date.now();
      await note.save();

      ctx.body = {
        note: note.toObject({ omit }),
      };
    };
  },

  pinNote() {
    return async ctx => {
      const { note } = ctx.state;
      note.pinned = Date.now();

      await note.save();

      ctx.body = {
        note: note.toObject({ omit }),
      };
    };
  },

  unpinNote() {
    return async ctx => {
      const { note } = ctx.state;
      note.pinned = undefined;

      await note.save();

      ctx.body = {
        note: note.toObject({ omit }),
      };
    };
  },
};
