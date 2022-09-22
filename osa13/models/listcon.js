const { Model, DataTypes } = require("sequelize")

const { sequelize } = require("../util/db")

class Listcon extends Model { }

Listcon.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },
    seen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    listId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "lists", key: "id" },
    },
    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "blogs", key: "id" },
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "listcons"
})

module.exports = Listcon