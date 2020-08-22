const passport = require('passport');

module.exports = function (ctx, next) {
    return passport.authenticate('jwt', async function (error, user) {
        if (error || !user) {
            next();
        } else {
            await ctx.login(user);
            await next();
        };
    })(ctx, next);
};