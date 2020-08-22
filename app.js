const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');

const generateKeyPair = require('./helpers/generate-key-pair');
const Teacher = require('./models/Teacher');

const config = require('config');

const app = new Koa();

const mongoose = require('./libs/mongoose');

(async () => {
    const superAdmin = await Teacher.findOne({ role: 'superadmin' });
    if (!superAdmin) require('./seed.js');
})();

app.use(
    cors({
        credentials: true,
        origin: config.CLIENT_ORIGIN
    })
);
const server = http.createServer(app.callback());

require('./handlers/static').init(app);
require('./handlers/logger').init(app);
require('./handlers/errors').init(app);
require('./handlers/body-parser').init(app);
require('./handlers/passport').init(app);

const router = new Router();


require('./routes/auth').init(router);
require('./routes/teacher').init(router);

app.use(router.routes());

server.listen(process.env.PORT || config.port, () => {
    console.log(`server listen on ${server.address().port}`)
});

module.exports = app;