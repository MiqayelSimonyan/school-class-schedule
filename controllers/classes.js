const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const Class = require('../models/Class');

const getClasses = async (ctx, next) => {
    try {
        const classes = await Class.find();

        ctx.body = classes.map(item => item.toObject());
    } catch (err) {
        next(err);
    }
};

const getClassItem = async (ctx, next) => {
    try {
        const classItem = await Class.findOne({ _id: ctx.params.id });

        ctx.body = classItem.toObject();
    } catch (err) {
        next(err);
    }
};

const createClass = async (ctx, next) => {
    try {
        const classItem = await Class.create(ctx.request.body);
        ctx.body = classItem.toObject();
    } catch (err) {
        next(err);
    };
};

const updateClass = async (ctx, next) => {
    const id = ctx.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        ctx.throw(400, 'Invalid ObjectId');
    };

    try {
        const classItem = await Class.findOneAndUpdate(
            { _id: id },
            ctx.request.body,
            {
                new: true,
                useFindAndModify: false,
            }
        );

        if (!classItem) throw { message: 'Class Not Found' };
        ctx.body = classItem.toObject();
    } catch (err) {
        next(err);
    }
};

const deleteClass = async (ctx, next) => {
    const id = ctx.params.id;

    try {
        await Class.remove({ _id: id });

        ctx.body = { success: true };
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getClasses,
    getClassItem,
    createClass,
    updateClass,
    deleteClass
};