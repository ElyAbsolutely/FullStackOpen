const router = require("express").Router()

const { User, Blog, List, Key } = require("../models")

router.get("/api/users", async (req, res) => {
    const users = await User.findAll({
        include: [{
            model: Blog,
            attributes: { exclude: ["userId"] }
        },
        {
            model: List, attributes: { exclude: ["userId"] },
            include: {
                model: Blog,
                attributes: ["id", "title"],
                through: { attributes: ["id", "seen"] }
            }
        }]
    })
    res.json(users)
})

router.get("/api/users/:id", async (req, res) => {
    const where = {}

    if (req.query.read) {
        where.seen = req.query.read
    }

    const user = await User.findByPk(req.params.id, {
        include: [{
            model: Blog,
            attributes: { exclude: ["userId"] }
        },
        {
            model: List, attributes: { exclude: ["userId"], },
            include: {
                model: Blog,
                attributes: ["id", "title"],
                through: {
                    attributes: ["id", "seen"],
                    where
                }
            }
        }]
    })
    res.json(user)
})

router.post("/api/users", async (req, res) => {
    const user = await User.create(req.body)
    res.json(user)
})

router.put("/api/users/:username", async (req, res) => {
    const user = await User.findOne({
        where: { username: req.params.username },
    })
    user.username = req.body.username
    await user.save()
    res.status(200).json(user)
})

router.put("/api/users/disable/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if (user.disabled === false) {
        user.disabled = true
        const key = await Key.findOne({ where: { userId: user.id } })
        if (key)
            await key.destroy()
    } else if (user.disabled === true)
        user.disabled = false

    await user.save()
    res.status(200).json(user)
})

router.delete("/api/users/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if (!user)
        res.status(404).end();
        
    await user.destroy()
    res.status(200).end()
})

module.exports = router