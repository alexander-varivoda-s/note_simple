const config = require('config');
const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');

const User = require('../models/user');

const localStrategyOptions = {
  usernameField: 'email',
  passwordField: 'password',
};

const localStrategyVerifier = (email, password, done) =>
  User.findOne({ email }, (err, user) => {
    if (err) {
      return done(err);
    }

    if (!user || !user.validatePassword(password)) {
      return done(null, false);
    }

    return done(null, user);
  });

const localStrategy = new LocalStrategy(
  localStrategyOptions,
  localStrategyVerifier,
);

const jwtStrategyOptions = {
  secretOrKeyProvider: (request, rawJwtToken, done) => {
    done(null, config.get('accessToken.secret'));
  },
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  algorithms: ['HS512'],
};

const jwtStrategyVerifier = (payload, done) => {
  User.findById(payload.sub, done);
};

const jwtStrategy = new JwtStrategy(jwtStrategyOptions, jwtStrategyVerifier);

passport.use(localStrategy);
passport.use(jwtStrategy);

module.exports = passport;
