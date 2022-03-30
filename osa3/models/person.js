const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

console.log("connecting to", url)
mongoose.connect(url)
    .then(console.log("Connected to MongoDB"))
    .catch((error) => {
        console.log("Error connecting to MongoDB:", error.message)
    })

function numberTest(val) {
    if (/\d{2}-\d/.test(val) || /\d{3}-\d/.test(val))
        return true
    else
        return false
}

const personSchema = new mongoose.Schema({
    id: Number,
    name: {
        type: String,
        minlength: [3, "Name must be at least 3 characters long"]
    },
    number: {
        type: String,
        minlength: [8, "Number must be at least 8 characters long, counting line"],
        validate: [numberTest, "Number must be XX-X.. or XXX-X.."]
    },
    important: Boolean
})

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Person", personSchema)