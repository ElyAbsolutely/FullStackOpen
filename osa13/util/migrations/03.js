const { DataTypes } = require("sequelize")

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable("keys", {
            key: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: "users", key: "id" },
            },
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable("keys")
    },
}