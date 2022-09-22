const express = require("express")
require("express-async-errors")
const app = express()

const { PORT } = require("./util/config")
const { connectToDB } = require("./util/db")
const errorHandler = require("./middleware/errorHandler")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const listsRouter = require("./controllers/lists")

app.use(express.json())
app.use(errorHandler)
app.use("/", blogsRouter)
app.use("/", usersRouter)
app.use("/", loginRouter)
app.use("/", listsRouter)

const startServer = async () => {
    await connectToDB()
    app.listen(PORT, () => {
        console.log("Server running on port " + PORT)
    })
}

startServer()