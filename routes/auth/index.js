const authorized = require('../../middleware/authorized');

exports.init = (router) => {
    router.post('/signUp', require('../../controllers/auth').signUp);
    router.post('/signIn', require('../../controllers/auth').signIn);
    router.get('/isAuth', authorized, require('../../controllers/auth').isAuth);
    router.get('/signOut', require('../../controllers/auth').signOut);
};