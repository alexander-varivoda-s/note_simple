const mongoose = require('mongoose');

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

module.exports = mongoose.model('Revision', revisionSchema, 'notes_revisions');
