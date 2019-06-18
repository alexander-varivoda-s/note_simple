const mongoose = require('mongoose');
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation');

const Revision = require('./note-revision');

const { Schema } = mongoose;

const noteSchema = new Schema({
  text: {
    type: String,
    default: '',
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Note author is required.'],
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  pinned: {
    type: Date,
  },
});

if (!noteSchema.options.toObject) {
  noteSchema.options.toObject = {};
}

noteSchema.options.toObject.transform = (doc, ret, options) => {
  if (options.omit) {
    options.omit.split(' ').forEach(prop => delete ret[prop]);
  }
  return ret;
};

noteSchema.pre('remove', async function(next) {
  await Revision.deleteMany({ note: this.id }).exec();
  await next();
});

mongoose.plugin(mongooseBeautifulUniqueValidation);

module.exports = mongoose.model('Note', noteSchema, 'notes');
