const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let publicFields = [
    '_id',
    'name',
    'lessons'
];

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lessons: [{
        type: Schema.Types.ObjectId,
        ref: 'Lesson'
    }]
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

classSchema.statics.publicFields = publicFields;

module.exports = mongoose.model('Class', classSchema);