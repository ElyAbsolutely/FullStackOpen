const { DataTypes } = require("sequelize")

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable("lists", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "users", key: "id" },
            }
        })
        await queryInterface.createTable("listcons", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            seen: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            blog_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "blogs", key: "id" },
            }
        })
        await queryInterface.addColumn("listcons", "list_id", {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "lists", key: "id" },
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable("lists")
        await queryInterface.dropTable("listcons")
    },
}