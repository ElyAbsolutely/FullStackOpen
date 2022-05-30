const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    born: {
        type: Number,
    },
    books: {
        type: Array,
    }
})

module.exports = mongoose.model("Author", schema)