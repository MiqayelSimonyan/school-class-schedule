const jwt = require('jsonwebtoken');

const passport = require('../libs/passport');
const Teacher = require('../models/Teacher');

const signUp = async (ctx, next) => {
    const { username, password } = ctx.request.body;

    try {
        const teacher = new Teacher({});

        await teacher.setPassword(password);
        await teacher.setUsername(username);

        await teacher.save();

        if (teacher.token) {
            ctx.cookies.set('token', teacher.token, { httpOnly: true });
            await ctx.login(teacher);

            ctx.body = teacher.toObject();
        } else {
            ctx.throw(401, 'Token is not found');
        };
    } catch (err) {
        throw err;
    };
};

const signIn = async (ctx, next) => {
    const { username, password } = ctx.request.body;

    await passport.authenticate('local', { session: false }, async function (err, teacher, info) {
        if (err) throw err;

        if (teacher) {
            if (teacher.token) {
                ctx.cookies.set('token', teacher.token, { httpOnly: true });
                await ctx.login(teacher);

                ctx.body = teacher.toObject();
            } else {
                ctx.throw(401, 'Token is not found');
            };
        } else {
            ctx.throw(401, info);
        };
    })(ctx, next);
};

const signOut = async (ctx, next) => {
    try {
        let user = ctx.state.user;
        await ctx.logOut();

        ctx.cookies.set('token', '');

        ctx.body = {
            _id: user._id,
            success: true
        };
    } catch (err) {
        ctx.body = false;
    };
};

const isAuth = async (ctx, next) => {
    if (ctx.isAuthenticated()) {
        ctx.body = {
            isAuth: true,
            user: ctx.state.user.toObject()
        };
    } else {
        ctx.body = {
            isAuth: false,
            user: null
        };
    };
};

module.exports = { signIn, signUp, signOut, isAuth };