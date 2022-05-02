const blogsRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const Blog = require("../models/blog")

blogsRouter.get("/api/blogs", async (request, response) => {
    const returnedBlogs = await Blog.find({}).populate("user", { username: 1 })
    response.json(returnedBlogs)
})

blogsRouter.post("/api/blogs", async (request, response) => { // POST
    const body = request.body
    const user = request.user
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    //console.log(user)

    if (!request.token || !decodedToken.id)
        return response.status(401).json({ error: "Token missing or invalid" })

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: null,
        user: user._id.toString()
    })

    if (body.likes === undefined)
        blog.likes = 0
    else
        blog.likes = body.likes

    const returnedBlog = await blog.save()
    user.blogs = user.blogs.concat(returnedBlog._id)
    await user.save()
    response.status(201).json(returnedBlog)
})

blogsRouter.get("/api/blogs/:id", async (request, response) => { // ID
    const returnedBlog = await Blog.findById(request.params.id)
    if (returnedBlog)
        response.json(returnedBlog)
    else
        response.status(404).end()
})

blogsRouter.put("/api/blogs/:id", async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const returnedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(returnedBlog)
})

blogsRouter.delete("/api/blogs/:id", async (request, response,) => {
    const user = request.user
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id)
        return response.status(401).json({ error: "Token missing or invalid" })

    const blog = await Blog.findById(request.params.id)
    const blogUserID = blog.user.toString()

    if (user._id.toString() === blogUserID) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else
        response.status(401).json({ error: "Non-matching IDs" })
})

module.exports = blogsRouter