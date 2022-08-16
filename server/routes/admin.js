const express = require('express');
const adminModel = require('../model/admin');
const student = require('../model/student');
const studentModel = require('../model/student');
const teacherModel = require('../model/teacher');
const adminRouter = express.Router();
require('../database/config');
const mailer = require('../helper/mailer');


const checkAuth = (req, res, next) => {
    adminModel.find({ _id: req.cookies.user }, (err, admin) => {
        if (err) {
            console.log(err);
        } else {
            if (admin.length) {
                next()
            } else {
                res.status(401).json({
                    error: "You are not authorise to access this page..!"
                })
            }
        }
    })
}

adminRouter.use(checkAuth);

adminRouter.post('/login', (req, res) => {
    const data = req.body;
    adminModel.find({
        email: data.email,
        password: data.password
    }, (err, data) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})


adminRouter.get('/newStudents', (req, res) => {
    studentModel.find({ isApprover: false }, (err, students) => {
        if (err) {
            res.status(400).json({ err });
        } else {
            res.status(200).json({
                success: true,
                students
            });
        }
    })
})


adminRouter.get('/newTeachers', (req, res) => {
    teacherModel.find({ isApprover: false }, (err, students) => {
        if (err) {
            res.status(400).json({ err });
        } else {
            res.status(200).json({
                success: true,
                students
            });
        }
    })
})


adminRouter.get('/student/:id', (req, res) => {
    studentModel.find({ _id: req.params.id }, (err, students) => {
        if (err) {
            res.status(400).json({ err });
        } else {
            res.status(200).json({
                success: true,
                students
            });
        }
    })
})


adminRouter.put('/approveStudent/:id', async (req, res) => {
    const user = await studentModel.findByIdAndUpdate(req.params.id, {
        isApproved: req.body.status
    },
        {
            new: true,
            useValidation: true,
            useFindAndModify: false
        })
    await user.save();
    mailer(user.email.toString(), "Your Profile has been Approved Successfully..!")
    res.status(200).json({
        success: true,
        user
    })
})


adminRouter.put('/approveTeacher/:id', async (req, res) => {
    const user = await teacherModel.findByIdAndUpdate(req.params.id, {
        isApproved: req.body.status
    },
        {
            new: true,
            useValidation: true,
            useFindAndModify: false
        })
    await user.save();
    mailer(user.email.toString(), "Your Profile has been Approved Successfully..!")
    res.status(200).json({
        success: true,
        user
    })
})


adminRouter.put('/assignTeacher', async (req, res) => {
    const user = await studentModel.findByIdAndUpdate(req.params.id, {
        teacher_id: req.body.teacherID
    },
        {
            new: true,
            useValidation: true,
            useFindAndModify: false
        })
    await user.save();
    mailer(user.email.toString(), "A teacher has been assigned to you..!")
    res.status(200).json({
        success: true,
        user
    })
})


module.exports = adminRouter;