const { Model, DataTypes } = require("sequelize")

const { sequelize } = require("../util/db")

class Blog extends Model { }

Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.TEXT
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    year: {
        type: DataTypes.INTEGER,
        validate: { min: 1991, max: new Date().getFullYear() }
    },
    userId: {
        type: DataTypes.INTEGER,
        references: { model: "users", key: "id" },
    }
}, {
    sequelize,
    underscored: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    modelName: "blogs"
})

module.exports = Blog