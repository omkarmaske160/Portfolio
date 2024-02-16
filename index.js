const express = require("express")
require("dotenv").config({ path: "./.env" })
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")


//mongoose connection
mongoose.connect(process.env.MONGO_URL)

const app = express()
app.use(express.json())

app.use(cors({
    origin: "https://portfolio-uueg.onrender.com"
}))
app.use(express.static(path.join(__dirname, "dist")))

//routing
app.use("/api/admin", require("./route/emailRoute"))
app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
})


mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED");
    app.listen(process.env.PORT, console.log("SERVER STARTED"))
})