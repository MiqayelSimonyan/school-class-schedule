const Teacher = require('./models/Teacher');
const Class = require('./models/Class');

const superAdmin = {
    username: 'Super Admin',
    role: 'superadmin',
    password: '123456a'
};

const classes = [
    { name: 'class 1' },
    { name: 'class 2' },
    { name: 'class 3' },
    { name: 'class 4' },
    { name: 'class 5' },
    { name: 'class 6' },
    { name: 'class 7' },
    { name: 'class 8' }
];

try {
    (async () => {
        const teacher = new Teacher({});

        teacher.role = superAdmin.role;
        await teacher.setPassword(superAdmin.password);
        await teacher.setUsername(superAdmin.username);

        await teacher.save();

        await Class.insertMany(classes);
    })();
} catch (err) {
    throw err;
};