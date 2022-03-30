const mongoose = require("mongoose")

const password = process.argv[2]

const url = "mongodb+srv://Administrator:" + password + "@puhelinluettelobackendj.ngkdc.mongodb.net/personsDB?retryWrites=true&w=majority"

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model("Person", noteSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
})

if (process.argv.length === 5) {

    person.save()
        .then(result => {
            console.log("Added " + result.name + " with the number " + result.number + " into the database")
            mongoose.connection.close()
        })

} else if (process.argv.length === 3) {

    Person.find({})
        .then(result => {

            console.log("Phonebook:")

            result.forEach(guy => {
                console.log(guy.name + " " + guy.number)
            })

            mongoose.connection.close()
        })
} else {

    console.log("Invalid argument")
    process.exit(1)

}