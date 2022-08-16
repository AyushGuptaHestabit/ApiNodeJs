const express = require('express');
"use strict";
const nodemailer = require("nodemailer");

main().catch(console.error);

const port = 3000;

const app = express();


// async..await is not allowed in global scope, must use a wrapper
async function main(to, message) {
    var transport = nodemailer.createTransport({
        service: "one",
        auth: {
            user: "ayush.gupta@hestabit.in",
            pass: "Ayush123**"
        }
    })

    var mailOptions = {
        from: "ayush.gupta@hestabit.in",
        to: to,
        subject: "School Management System",
        text: message
    }
    transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            consolelog("Email Sent" + info.response)
        }
    })

}


// app.use(cookieParser());


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})