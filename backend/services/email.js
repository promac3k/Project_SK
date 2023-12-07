const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_TO,
        pass: process.env.EMAIL_PASS
    }
})

module.exports = transporter