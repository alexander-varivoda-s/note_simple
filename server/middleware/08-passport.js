const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('config');

const UserModel = require('../models/user');

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
    }
  )
);

const { accessTokenSecret, algorithm } = config.get('jwt');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: accessTokenSecret,
  algorithms: [algorithm],
};

passport.use(
  new JwtStrategy(opts, async function getUser(jwtPayload, done) {
    try {
      const user = await UserModel.findById(jwtPayload.sub).exec();
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = app => app.use(passport.initialize());
