const mongoose = require('mongoose');
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation');

const { Schema } = mongoose;

const revisionSchema = new Schema({
  text: {
    type: String,
    default: '',
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: 'Note',
    required: [true, 'Note reference is required.'],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

mongoose.plugin(mongooseBeautifulUniqueValidation);

module.exports = mongoose.model('Revision', revisionSchema, 'notes_revisions');
