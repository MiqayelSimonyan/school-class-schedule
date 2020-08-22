const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
require('dotenv').config();

const generateKeyPair = () => {
    const keyPair = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: process.env.PASSPHRASE
        }
    });

    fs.writeFileSync(path.join(__dirname, '../', 'id_rsa_pub.pem'), keyPair.publicKey);
    fs.writeFileSync(path.join(__dirname, '../', 'id_rsa_priv.pem'), keyPair.privateKey);
};

module.exports = generateKeyPair();