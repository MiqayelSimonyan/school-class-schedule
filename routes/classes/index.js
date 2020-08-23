const authorized = require('../../middleware/authorized');

exports.init = (router) => {
    router.get('/classes', authorized, require('../../controllers/classes').getClasses);
    router.get('/classes/:id', authorized, require('../../controllers/classes').getClassItem);
    router.post('/classes', authorized, require('../../controllers/classes').createClass);
    router.patch('/classes/:id', authorized, require('../../controllers/classes').updateClass);
    router.delete('/classes/:id', authorized, require('../../controllers/classes').deleteClass);
};