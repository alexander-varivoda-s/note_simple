const mongoose = require('mongoose');
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation');

const Note = require('./note');

const { Schema } = mongoose;

const tagSchema = new Schema({
  name: {
    type: String,
    maxlength: 32,
    required: [true, 'Tag name is required.'],
    index: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Tag author is required.'],
    index: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

tagSchema.pre('remove', async function(next) {
  const notes = await Note.find({ tags: this.id }).exec();

  await Promise.all(
    notes.map(note => {
      note.tags = note.tags.filter(oid => oid.toString() !== this.id);
      return note.save();
    }),
  );
  await next();
});

tagSchema.plugin(mongooseBeautifulUniqueValidation);

module.exports = mongoose.model('Tag', tagSchema, 'tags');
