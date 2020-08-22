const passport = require('koa-passport');
const Teacher = require('../../models/Teacher');

const localStrategy = require('./strategies/local');
const jwtStrategy = require('./strategies/jwt');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  await Teacher.findById(id, done);
});

passport.use(localStrategy);
passport.use(jwtStrategy);

module.exports = passport;