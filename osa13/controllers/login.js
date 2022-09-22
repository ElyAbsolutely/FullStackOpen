const router = require("express").Router()
const jwt = require("jsonwebtoken")

const { User, Key } = require("../models")
const { SECRET } = require("../util/config")

// Password === 1234

router.post("/api/login", async (req, res) => {
    const { username, password } = req.body
    if (!password || password !== 1234)
        return res.status(400).send({ error: "Invalid password" });

    const user = await User.findOne({ where: { username } })
    if (user.disabled === true)
        return res.status(400).send({ error: "This user has been disabled" });


    const existingKey = await Key.findOne({ where: { userId: user.id } })
    if (existingKey)
        existingKey.destroy()

    const userForToken = { username: user.username, id: user.id }
    const token = jwt.sign(userForToken, SECRET)

    console.log(token)
    const key = await Key.create({ key: token, userId: user.id })
    return res.status(200).send({ key })
})

router.post("/api/logout/:id", async (req, res) => {
    const key = await Key.findOne({ where: { userId: req.params.id } })
    await key.destroy()
    res.status(200).end()
})

router.get("/api/keys", async (req, res) => {
    const keys = await Key.findAll({
        include: {
            model: User,
            attributes: ["username"]
        }
    })
    res.json(keys)
})

module.exports = router