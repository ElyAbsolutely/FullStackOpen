const { Model, DataTypes } = require("sequelize")

const { sequelize } = require("../util/db")

class Key extends Model { }

Key.init({
    key: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "keys"
})

module.exports = Key