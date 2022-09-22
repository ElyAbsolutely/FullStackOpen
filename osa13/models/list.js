const { Model, DataTypes } = require("sequelize")

const { sequelize } = require("../util/db")

class List extends Model { }

List.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
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
    modelName: "lists"
})

module.exports = List