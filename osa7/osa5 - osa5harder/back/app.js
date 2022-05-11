const express = require("express")
const app = express()
require("express-async-errors")
const cors = require("cors")
const morgan = require("morgan")
const mongoose = require("mongoose")

const config = require("./utils/config")
const middleware = require("./utils/middleware")
const {info, error} = require("./utils/logger")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")

info("Starting app")

morgan.token("skipPOST", function (request) {
    if (request.method === "POST") {
        return JSON.stringify(request.body)
    } else return ""
})
app.use(morgan(":method :url :status :res[content-length] :skipPOST :response-time ms")) //Custom

info("Connecting to MongoDB")
info(config.MONGODB_URI)
mongoose
    .connect(config.MONGODB_URI)
    .then(info("Connected to MongoDB"))
    .catch((incomingError) => {
        error("Error connecting to MongoDB:", incomingError.message)
    })

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

app.use("/", blogsRouter)
app.use("/", usersRouter)
app.use("/", loginRouter)

if (process.env.NODE_ENV === "test") {
    const cleanerRouter = require("./controllers/cleaner")
    app.use("/", cleanerRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
