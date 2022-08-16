const express = require('express');
const studentModel = require('../model/student');
require('../database/config');
const jwt = require('jsonwebtoken');

const studentRouter = express.Router();


const checkAuth = (req, res, next) => {
    studentModel.find({ _id: req.cookies.user }, (err, admin) => {
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

studentRouter.use(checkAuth);

// studentRouter.post('/login', (req, res) => {
//     const data = req.body;
//     studentModel.find({
//         email: data.email,
//         password: data.password
//     }, (err, data) => {
//         if (err) {
//             res.status(400).send(err);
//         } else {
//             res.status(200).send(data);
//         }
//     })
// })

// studentRouter.post('/register', async (req, res) => {
//     // console.log(req.body);
//     const student = new studentModel(req.body);
//     // console.log(student);

//     const token = await student.generateAuthToken();

//     res.cookie('jwt',token,{})

//     student.save().then(() => {
//         res.status(200).json({
//             success: true,
//             student
//         });
//     }).catch((err) => res.status(400).send(err))
// })

studentRouter.put('/update/:id', async (req, res) => {
    const user = await studentModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        useValidation: true,
        useFindAndModify: false
    })
    await user.save();
    res.status(200).json({
        success: true,
        user
    })
})

studentRouter.get('/', (req, res) => {
    studentModel.find({}, (err, students) => {
        if (err) {
            res.send(err);
        } else {
            res.send(students);
        }
    })
})


module.exports = studentRouter;


// User.find({}, (err, user) => {
//     if (err) {
//         console.warn(err);
//     } else {
//         console.log(user);
//     }
// })