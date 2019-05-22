const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const UserModel = require('../models/user');

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async function getUser(id, done) {
  try {
    const user = await UserModel.findById(id, {
      displayName: 1,
      email: 1,
      created: 1,
      updated: 1,
    }).exec();
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async function getUser(email, password, done) {
      try {
        const user = await UserModel.findOne({ email }).exec();

        if (!user || !user.validatePassword(password) || !user.emailVerified) {
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());
};
