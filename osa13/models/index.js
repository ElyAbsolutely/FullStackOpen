const Blog = require("./blog")
const User = require("./user")
const List = require("./list")
const Listcon = require("./listcon")
const Key = require("./key")

User.hasMany(Blog)
Blog.belongsTo(User)

User.hasMany(List)
List.belongsTo(User)
List.belongsToMany(Blog, { through: Listcon })
Blog.belongsToMany(List, { through: Listcon })
List.hasMany(Listcon)
Listcon.belongsTo(List)

User.hasOne(Key)
Key.belongsTo(User)

module.exports = {
    Blog,
    User,
    List,
    Listcon,
    Key
}