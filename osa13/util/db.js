const { Sequelize } = require("sequelize")
const { Umzug, SequelizeStorage } = require("umzug")

const { DATABASE_URL } = require("./config")

const sequelize = new Sequelize(DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
})

const migrationConf = {
    migrations: {
        glob: "util/migrations/*.js",
    },
    storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
    context: sequelize.getQueryInterface(),
    logger: console,
}
const runMigrations = async () => {
    const migrator = new Umzug(migrationConf)
    const migrations = await migrator.up()
    console.log("Migrations up to date", {
        files: migrations.map((mig) => mig.name),
    })
}

const rollbackMigration = async () => {
    await sequelize.authenticate()
    const migrator = new Umzug(migrationConf)
    await migrator.down()
}

const connectToDB = async () => {
    try {
        await sequelize.authenticate()
        await runMigrations()
        console.log("Database connected")
    } catch (e) {
        console.log("Connecting database failed", e)
        return process.exit(1)
    }

    return null
}

module.exports = { connectToDB, sequelize, rollbackMigration }