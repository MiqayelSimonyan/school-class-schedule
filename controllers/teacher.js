const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const Teacher = require('../models/Teacher');

const getTeacher = async (ctx, next) => {
    if (!ctx.state.user) {
        ctx.body = 'User Not Found';
    } else {
        ctx.body = ctx.state.user.toObject();
    };
};

const getTeachers = async (ctx, next) => {
    try {
        if (ctx.state.user.role.indexOf('superadmin') != -1) {
            const teachers = await Teacher.find({ _id: { $ne: ctx.state.user._id } });

            ctx.body = teachers.map((teacher) => teacher.toObject());
        } else {
            ctx.body = [];
        };
    } catch (err) {
        throw err;
    }
};

const getTeacherById = async (ctx, next) => {
    const id = ctx.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        ctx.throw(400, 'Invalid ObjectId');
    };

    const teacher = await Teacher.findById(id);

    ctx.body = teacher.toObject();
};

const updateTeacher = async (ctx, next) => {
    const id = ctx.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        ctx.throw(400, 'Invalid ObjectId');
    };

    try {
        const teacher = await Teacher.findOneAndUpdate(
            { _id: id },
            ctx.request.body,
            {
                new: true,
                useFindAndModify: false,
            }
        );

        if (!teacher) throw { message: 'Teacher Not Found' };
        ctx.body = teacher.toObject();
    } catch (err) {
        next(err);
    }
};

module.exports = { getTeacher, getTeachers, getTeacherById, updateTeacher };