const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('config');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const Schema = mongoose.Schema;

let publicFields = [
    '_id',
    'username',
    'role'
];

const teacherSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin', 'superadmin']
    },
    classes: [{
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }],
    passwordHash: {
        type: String,
        required: true
    },
    salt: {
        required: true,
        type: String
    }
}, {
    timestamps: true,
    toObject: {
        transform(doc, ret, options) {
            let obj = {};

            publicFields.forEach((item) => {
                obj[item] = ret[item];
            });

            return obj;
        },
    }
});

function generatePassword(salt, password) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(
            password,
            salt,
            config.get('crypto.hash.iterations'),
            config.get('crypto.hash.length'),
            'sha512',
            (err, key) => {
                if (err) return reject(err);
                resolve(key.toString('hex'));
            }
        );
    });
};

teacherSchema.methods.setPassword = async function setPassword(password) {
    if (password !== undefined) {
        if (!/(?=.*[a-z])/.test(password)) {
            throw new Error('Password must contain letter');
        } else if (!/(?=.*[0-9])/.test(password)) {
            throw new Error('Password must contain digit');
        } else if (password.length < 4) {
            throw new Error('Password must be at least 4 characters in length');
        };
    };

    this.salt = crypto.randomBytes(config.get('crypto.hash.length')).toString('hex');
    this.passwordHash = await generatePassword(this.salt, password);
};

teacherSchema.methods.checkPassword = async function (password) {
    if (!password) return false;

    const hash = await generatePassword(this.salt, password);
    return hash === this.passwordHash;
};

teacherSchema.methods.setUsername = function setUsername(username) {
    if (username !== undefined) {
        if (username.length < 6) {
            throw new Error('Username must be at least 6 characters in length');
        };
    };

    this.username = username;
};

teacherSchema.virtual('token').get(function () {
    let payload = { id: this._id };

    let token = jwt.sign(
        payload,
        {
            key: config.get('token.PRIV_KEY'),
            passphrase: config.get('token.passphrase')
        },
        {
            algorithm: 'RS256',
            expiresIn: '24h'
        }
    );

    return token;
});

teacherSchema.statics.verifyToken = function (token) {
    try {
        return jwt.verify(
            token,
            config.get('token.PUB_KEY'),
            {
                algorithms: ['RS256']
            }
        );
    } catch (err) {
        return { error: err.message };
    }
};

teacherSchema.statics.decodeToken = function (token) {
    return jwt.decode(token);
};

teacherSchema.plugin(beautifyUnique);
teacherSchema.statics.publicFields = publicFields;

module.exports = mongoose.model('Teacher', teacherSchema);