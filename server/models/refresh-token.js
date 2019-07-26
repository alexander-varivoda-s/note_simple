const mongoose = require('mongoose');

const { Schema } = mongoose;

const refreshTokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required.'],
  },
  token: {
    type: String,
    required: [true, 'Refresh token is required.'],
  },
});

refreshTokenSchema.pre('save', async function() {
  await this.model('RefreshToken')
    .deleteMany({ user: this.user })
    .exec();
});

module.exports = mongoose.model(
  'RefreshToken',
  refreshTokenSchema,
  'refresh_tokens'
);
