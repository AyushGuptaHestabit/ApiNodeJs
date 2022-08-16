const express = require('express');
const adminModel = require('../model/admin');
const studentModel = require('../model/student');
const jwt = require('jsonwebtoken');
const teacherModel = require('../model/teacher');
const loginRouter = express.Router();
require('../database/config');

generateAuthToken = async (id) => {
    try {
        const token = jwt.sign({ _id: id }, "ayushguptahestabitayushguptahestabit");
        return token;
    } catch (error) {
        console.log(error);
    }
}

loginRouter.post('/', (req, res) => {
    adminModel.find(req.body, async (err, admin) => {
        if (err) {
            res.status(400).json(err)
        } else {
            if (admin.length) {

                // generate jwt token
                const token = await generateAuthToken(admin._id);

                res.status(200)
                    .cookie('token', token, { expires: new Date(Date.now() + (24 * 60 * 60 * 1000)), httpOnly: true })
                    .cookie('user', admin[0]._id.toString(), { expires: new Date(Date.now() + (24 * 60 * 60 * 1000)), httpOnly: true })
                    .json({
                        success: true,
                        token: token,
                        user: admin
                    });
            } else {
                studentModel.find(req.body, async (err, student) => {
                    if (err) {
                        res.status(400).json(err)
                    } else {
                        if (student.length) {
                            // generate jwt token
                            const token = await generateAuthToken(student._id);

                            res.status(200)
                                .cookie('token', token, { expires: new Date(Date.now() + (24 * 60 * 60 * 1000)), httpOnly: true })
                                .cookie('user', student[0]._id.toString().toString(), { expires: new Date(Date.now() + (24 * 60 * 60 * 1000)), httpOnly: true })
                                .json({
                                    success: true,
                                    token: token,
                                    user: student
                                });
                        } else {
                            teacherModel.find(req.body, async (err, teacher) => {
                                if (err) {
                                    res.status(400).json(err)
                                } else {
                                    if (teacher.length) {

                                        // generate jwt token
                                        const token = await generateAuthToken(teacher._id);

                                        res.status(200)
                                            .cookie('token', token, { expires: new Date(Date.now() + (24 * 60 * 60 * 1000)), httpOnly: true })
                                            .cookie('user', teacher[0]._id.toString(), { expires: new Date(Date.now() + (24 * 60 * 60 * 1000)), httpOnly: true })
                                            .json({
                                                success: true,
                                                token: token,
                                                user: teacher
                                            });
                                    } else {
                                        res.status(400).json({
                                            success: false,
                                            message: "Wrong Crendentials..!"
                                        })
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }
    })
})

module.exports = loginRouter;
