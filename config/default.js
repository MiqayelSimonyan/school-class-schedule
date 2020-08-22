const path = require('path');
const fs = require('fs');
require('dotenv').config()

const pathToPubKey = path.join(__dirname, '../', 'id_rsa_pub.pem');
const pathToPrivKey = path.join(__dirname, '../', 'id_rsa_priv.pem');

module.exports = {
  port: 8080,
  CLIENT_ORIGIN: 'http://localhost:3000',
  secret: 'mysecret',
  crypto: {
    hash: {
      length: 128,
      iterations: 10
    }
  },
  token: {
    PUB_KEY: fs.readFileSync(pathToPubKey, 'utf8'),
    PRIV_KEY: fs.readFileSync(pathToPrivKey, 'utf8'),
    passphrase: process.env.PASSPHRASE
  },
  logger: {
    level: 'info'
  },
  mongodb: {
    debug: true,
    uri: 'mongodb://localhost:27017/school-class-schedule'
  }
};
