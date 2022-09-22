const { Model, DataTypes } = require("sequelize")

const { sequelize } = require("../util/db")

class User extends Model { }

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    disabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

}, {
    sequelize,
    underscored: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    modelName: "users"
})

module.exports = User