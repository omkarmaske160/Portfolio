const { addFeedback } = require("../controller/emailController")

const router = require("express").Router()

router
    .post("/add-feedback", addFeedback)

module.exports = router