const authorized = require('../../middleware/authorized');

exports.init = (router) => {
    router.get('/teacher', authorized, require('../../controllers/teacher').getTeacher);
    router.get('/teachers', authorized, require('../../controllers/teacher').getTeachers);
    router.get('/teacher/:id', authorized, require('../../controllers/teacher').getTeacherById);
    router.patch('/teacher/:id', authorized, require('../../controllers/teacher').updateTeacher);
};