const express = require('express');
const adminModel = require('../model/admin');
const student = require('../model/student');
const admin = require('../model/admin');
const teacher = require('../model/teacher');
const studentModel = require('../model/student');
const teacherModel = require('../model/teacher');
const registerRouter = express.Router();
require('../database/config');


registerRouter.post('/', async (req, res) => {
    if (!req.body.role) {
        res.status(400).json('No Role Defined');
    }
    if (req.body.role === "Student") {
        const student = new studentModel(req.body);

        // generate jwt token
        const token = await student.generateAuthToken();

        student.save().then(() => {
            res.status(200)
                .cookie('token', token, { expires: new Date(Date.now() + (24 * 60 * 60 * 1000)), httpOnly: true })
                .cookie('user', student._id, { expires: new Date(Date.now() + (24 * 60 * 60 * 1000)), httpOnly: true })
                .json({
                    success: true,
                    token: token,
                    user: student
                });
        }).catch((err) => res.status(400).send(err))
    }
    if (req.body.role === "Teacher") {
        const teacher = new teacherModel(req.body);

        // generate jwt token
        const token = await teacher.generateAuthToken();

        teacher.save().then(() => {
            res.status(200)
                .cookie('token', token, { expires: new Date(Date.now() + (24 * 60 * 60 * 1000)), httpOnly: true })
                .cookie('user', student._id, { expires: new Date(Date.now() + (24 * 60 * 60 * 1000)), httpOnly: true })
                .json({
                    success: true,
                    token: token,
                    user: teacher
                });
        }).catch((err) => res.status(400).send(err))
    }
})

module.exports = registerRouter;
