const express = require('express');
const teacherModel = require('../model/teacher');
require('../database/config');

const teacherRouter = express.Router();

// teacherRouter.post('/login', (req, res) => {
//     const data = req.body;
//     teacherModel.find({
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

// teacherRouter.post('/register', (req, res) => {
//     const teacher = new teacherModel(req.body);
//     console.log(teacher);
//     teacher.save().then(() => {
//         res.status(200).send(teacher);
//     }).catch((err) => res.status(400).send(err))
// })

teacherRouter.put('/update/:id', async (req, res) => {
    const user = await teacherModel.findByIdAndUpdate(req.params.id, req.body, {
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

teacherRouter.get('/', (req, res) => {
    teacherModel.find({}, (err, teachers) => {
        if (err) {
            res.send(err);
        } else {
            res.send(teachers);
        }
    })
})

module.exports = teacherRouter;