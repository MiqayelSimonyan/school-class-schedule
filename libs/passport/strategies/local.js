const LocalStrategy = require('passport-local');
const Teacher = require('../../../models/Teacher');

module.exports = new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  async function (username, password, done) {
    try {
      const teacher = await Teacher.findOne({ username });
      if (!teacher) {
        return done(null, false, { message: 'User is not found' });
      };

      const isValidPassword = await teacher.checkPassword(password);

      if (!isValidPassword) {
        return done(null, false, { message: 'Password is wrong' });
      };

      return done(null, teacher, { message: 'Welcome' });
    } catch (err) {
      console.error(err);
      done(err);
    };
  }
);