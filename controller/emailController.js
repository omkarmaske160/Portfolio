const sendEmail = require("../utils/email");
const feedback = require("../model/emailModel");

exports.addFeedback = async (req, res) => {
    try {
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
