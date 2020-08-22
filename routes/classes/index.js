const authorized = require('../../middleware/authorized');

exports.init = (router) => {
    router.get('/classes', authorized, require('../../controllers/classes').getClasses);
    router.get('/classes/:id', authorized, require('../../controllers/classes').getClassItem);
};