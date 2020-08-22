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

module.exports = { getClasses, getClassItem };