const mongoose = require('mongoose');
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation');

const { Schema } = mongoose;

const refreshTokenSchema = new Schema({
  token: {
    type: String,
    required: [true, 'Refresh token is required.'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required.'],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

refreshTokenSchema.plugin(mongooseBeautifulUniqueValidation);

module.exports = mongoose.model(
  'RefreshToken',
  refreshTokenSchema,
  'refresh_tokens',
);
