const cleanerRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

cleanerRouter.post("/api/cleaner/reset", async (request, response) => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    response.status(204).end()
})

module.exports = cleanerRouter