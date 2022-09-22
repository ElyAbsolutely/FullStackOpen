const router = require("express").Router()
const jwt = require("jsonwebtoken")

const { List, Listcon, User, Blog, Key } = require("../models")
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

router.get("/api/lists", async (req, res) => {
        const lists = await List.findAll({ include: { model: Listcon, } })
        res.json(lists)
})

router.post("/api/lists", async (req, res) => {
                const user = await User.findByPk(req.body.userId, { include: { model: List, } })
                const blog = await Blog.findByPk(req.body.blogId)

                if (user.dataValues.lists.length === 0) {
                        const list = await List.create({ userId: user.id })
                        const listcon = await Listcon.create({ blogId: blog.id, listId: list.id })
                        res.json(listcon)
                } else {
                        const list = await List.findByPk(user.id)
                        const listcon = await Listcon.create({ blogId: blog.id, listId: list.id })
                        res.json(listcon)
                }
})

router.put("/api/lists/:id", tokenExtractor, async (req, res) => {
                const list = await List.findOne({ where: { userId: req.decodedToken.id } })
                const listcon = await Listcon.findOne({
                        where: { blogId: req.params.id, listId: list.id },
                })

                listcon.seen = req.body.seen
                await listcon.save()
                res.status(200).json(listcon)
})

module.exports = router