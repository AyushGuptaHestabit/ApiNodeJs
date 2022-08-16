const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const adminRouter = require('./server/routes/admin');
const teacherRouter = require('./server/routes/teacher');
const studentRouter = require('./server/routes/student');
const loginRouter = require('./server/routes/login');
const registerRouter = require('./server/routes/register');
const app = express();
const auth = require('./server/middleWare/auth');
const nodemailer = require("nodemailer");

// main('ayushg490@gmail.com', "hello");

dotenv.config({ path: 'config.env' });

const PORT = process.env.PORT || 8080

// CORS
app.use(async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', '*');
    return next();
});

// log requests
app.use(morgan('tiny'));

// Cookie helper
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.json())
// parsing request to the body parser

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/admin', auth, adminRouter);
app.use('/student', auth, studentRouter);
app.use('/teacher', auth, teacherRouter);

app.post('/ayush', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

app.get('/logout', (req, res) => {
    res.clearCookie("user").clearCookie("token").json({
        message: "Logged Out Successfully..!"
    });
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})