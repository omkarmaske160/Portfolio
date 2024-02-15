const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema({
    client_name: {
        type: String,
        required: true

    },
    client_email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },

}, { timestamps: true });

module.exports = mongoose.model("feedback", feedbackSchema)