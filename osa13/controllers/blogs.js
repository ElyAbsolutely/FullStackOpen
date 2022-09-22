const router = require("express").Router()
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken")

const { Blog, User, Key } = require("../models")
const { SECRET } = require("../util/config")

const tokenExtractor = async (req, res, next) => {
    const authorization = req.get("authorization")
    if (!authorization)
        return res.status(401).json({ error: "Authorization token missing" })

    const token = await Key.findByPk(authorization)
    console.log(token)
    if (!token)
        return res.status(401).json({ error: "Invalid token" })

    req.decodedToken = jwt.verify(token.key, SECRET)

    next()
}


router.get("/api/blogs", async (req, res) => {
    let where = {}

    if (req.query.search)
        where = {
            [Op.or]: [
                { author: { [Op.iLike]: "%" + req.query.search + "%" } },
                { title: { [Op.iLike]: "%" + req.query.search + "%" } }
            ]
        }

    const blogs = await Blog.findAll({
        include: {
            model: User
        },
        where,
        order: [
            ["likes", "DESC"],
        ]
    })

    res.json(blogs)
})

router.get("/api/blogs/:id", async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    res.json(blog)
})

router.post("/api/blogs", tokenExtractor, async (req, res) => {
    const blog = await Blog.create({ ...req.body, userId: req.decodedToken.id })
    res.json(blog)
})

router.put("/api/blogs/:id", async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    blog.likes = req.body.likes
    await blog.save()
    res.status(200).json(blog)
})

router.delete("/api/blogs/:id", tokenExtractor, async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    if (!blog)
        res.status(404).end();

    if (blog.user_id === req.decodedToken.id) {
        await blog.destroy()
        res.status(200).end()
    } else {
        return res.status(401).json({ error: "Blog can be only deleted by its creator" })
    }
})

router.get("/api/authors", async (req, res) => {
    const authors = await Blog.findAll({
        attributes: [
            "author",
            [sequelize.fn("COUNT", sequelize.col("id")), "blogs"],
            [sequelize.fn("SUM", sequelize.col("likes")), "likes"]
        ],
        group: "author"
    })
    res.json(authors)
})

module.exports = router