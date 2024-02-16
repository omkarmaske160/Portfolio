const sendEmail = require("../utils/email");
const feedback = require("../model/emailModel");
const validator = require("validator");

exports.addFeedback = async (req, res) => {
    try {
        const { client_name, client_email, subject, message } = req.body


        console.log(req.body);
        if (
            validator.isEmpty(client_name) ||
            validator.isEmpty(client_email) ||
            validator.isEmpty(subject) ||
            validator.isEmpty(message)
        ) {
            res.status(400).json({
                message: "all fields required"
            })
        }

        if (!validator.isEmail(client_email)) {
            return res.status(400).json({
                message: "please provide valid email"
            })
        }


        // Create feedback entry in the database
        const data = await feedback.create(req.body);

        // Send email
        await sendEmail({
            to: req.body.client_email,
        });

        // Respond to the client
        res.status(200).json({
            message: `Feedback sent successfully`,
        });
    } catch (error) {
        // Handle errors
        console.error('Error sending feedback or email:', error);
        res.status(400).json({
            message: error.message || "Something went wrong",
        });
    }
};
