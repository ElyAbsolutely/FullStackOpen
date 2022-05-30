const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    published: {
        type: Number,
    },
    author: {
        type: String,
    },
    genres: [
        { type: String }
    ]
})

module.exports = mongoose.model("Book", schema)