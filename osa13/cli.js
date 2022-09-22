require("dotenv").config()
const { Sequelize, QueryTypes } = require("sequelize")

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
})

const main = async () => {
    try {
        await sequelize.authenticate()
        const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
        blogs.forEach(
            blog => console.log(
                blog.author + ": '" + blog.title + "', " + blog.likes + " likes"
            )
        )
        const users = await sequelize.query("SELECT * FROM users", { type: QueryTypes.SELECT })
        users.forEach(
            user => console.log(
                "Name: " + user.name + ", username: " + user.username
            )
        )
        sequelize.close()
    } catch (error) {
        console.error("Unable to connect to the database:", error)
    }
}

main()