const nodeemailer = require("nodemailer")


const sendEmail = ({
    to = process.env.FORM_EMAIL,
    message = "Thank you for visiting my portfolio website and i will contact you as soon as posibile. once again thankyou.",
    subject = "Omkar Maske Portfolio Response"
}) => new Promise((resolve, reject) => {
    try {
        const mailer = nodeemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.FORM_EMAIL,
                pass: process.env.EMAIL_PASS
            }
        })
        mailer.sendMail({
            to,
            subject,
            text: message,
            from: process.env.FORM_EMAIL
        }, (err) => {
            if (err) {
                console.log(err)
                return reject(err)
            }
            else {
                console.log("email send Successfully");
                return resolve("email send success")
            }
        })
    } catch (error) {
        console.log(error);
        return reject(error.message)
    }
})
module.exports = sendEmail;