const Cookies = require('cookies');
const config = require('config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const Teacher = require('../../../models/Teacher');

let cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) {
        const cookies = new Cookies(req, {});

        token = cookies.get('token');
    };

    return token;
};

const options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: config.get('token.PUB_KEY'),
    algorithms: ['RS256']
};

module.exports = new JwtStrategy(options, async (payload, done) => {
    const teacher = await Teacher.findOne({ _id: payload.id });

    if (!teacher) {
        return done(null, false, { message: 'User is not found' });
    };

    return done(null, teacher, { message: 'Welcome' });
});