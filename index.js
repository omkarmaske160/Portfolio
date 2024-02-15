const express = require("express")
require("dotenv").config({ path: "./.env" })
const mongoose = require("mongoose")
const cors = require("cors")

//mongoose connection
mongoose.connect(process.env.MONGO_URL)

const app = express()
app.use(express.json())

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
app.use(express.static(path.join(__dirname, "dist")))

//routing
app.use("/api/admin", require("./route/emailRoute"))
app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
})
// error handleer in express js
app.use("*", (err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something Went Wrong"
    })
})

mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED");
    app.listen(process.env.PORT, console.log("SERVER STARTED"))
})