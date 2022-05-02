const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/api/users", async (request, response) => {
    const returnedUsers = await User.find({}).populate("blogs", { title: 1, url: 1, likes: 1 })
    response.json(returnedUsers)
})

usersRouter.post("/api/users", async (request, response) => {
    const { username, name, password } = request.body

    const existingUser = await User.findOne({ username })
    if (existingUser)
        return response.status(400).json({ error: "Username is already used" })

    if (password.length < 3)
        return response.status(400).json({ error: "Password must be minimum 3 characters long" })

    const users = await User.find({})
    const all = users.map(u => u.toJSON())

    for (let x = 0; x < all.length; x++) {
        const exists = await bcrypt.compare(password, all[x].passwordHash)
        if (exists)
            return response.status(400).json({ error: "Password is already used" })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter