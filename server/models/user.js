const mongoose = require('mongoose');
const crypto = require('crypto');
const config = require('config');
const mongooseBeautifulUniqueValidation = require('mongoose-beautiful-unique-validation');

const { Schema } = mongoose;
const { passwordLength, saltLength, iterations, keylen, digest } = config.get(
  'crypto',
);

const userSchema = new Schema({
  displayName: {
    type: String,
    maxlength: [32, 'Display name length exceeds 32 characters.'],
  },
  email: {
    type: String,
    maxlength: [256, 'Email length exceeds 256 characters.'],
    validate: {
      validator: v => /^\S+@\S+\.\S+$/.test(v),
      message: 'Invalid email',
    },
    unique: 'Email already exists.',
    required: [true, 'Email is required.'],
  },
  salt: {
    type: String,
    required: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
    index: true,
  },
});

userSchema
  .virtual('password')
  .set(function(password = '') {
    if (typeof password === 'string' && password.length >= passwordLength) {
      this._plainPassword = password;
      this.salt = crypto.randomBytes(saltLength).toString('base64');
      this.password_hash = crypto
        .pbkdf2Sync(password, this.salt, iterations, keylen, digest)
        .toString('base64');
    } else {
      this.salt = null;
      this.password_hash = null;

      if (!password || typeof password !== 'string') {
        return this.invalidate('password', 'Invalid password.');
      }

      if (password.length < passwordLength) {
        this.invalidate(
          'password',
          'Password is too short. Must be at least 6 characters long.',
        );
      }
    }
  })
  .get(function() {
    return this._plainPassword;
  });

userSchema.methods.validatePassword = function(password = '') {
  const passwordToCheck = crypto
    .pbkdf2Sync(password, this.salt, iterations, keylen, digest)
    .toString('base64');
  return this.password_hash === passwordToCheck;
};

/**
 * TODO:
 *  - Add queries that delete all related to user entities.
 */
userSchema.pre('remove', async function(next) {
  await next();
});

userSchema.pre('save', async function(next) {
  this.updated = Date.now();
  await next();
});

userSchema.plugin(mongooseBeautifulUniqueValidation);

module.exports = mongoose.model('User', userSchema, 'users');
