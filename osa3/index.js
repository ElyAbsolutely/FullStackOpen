const express = require("express")
const app = express()
const cors = require("cors")
var morgan = require("morgan")

app.use(express.static("build"))
app.use(express.json())

app.use(cors())

require("dotenv").config() //Before Person
const Person = require("./models/person")

app.use(morgan("tiny")) //Tiny
morgan.token("skipPOST", function (request) { if (request.method === "POST") { return JSON.stringify(request.body) } else return "" })
app.use(morgan(":method :url :status :res[content-length] :skipPOST :response-time ms")) //Custom

app.get("/", (request, response) => { // GET /
    response.send("<h1>Running persons.json...</h1>")
})

app.get("/info", (request, response, next) => { // GET INFO

    Person.find({})
        .then(result => {
            response.send("<div><h2>Phone book has info for " + result.length + " people</h2><h2>" + new Date() + "</h2></div>")
        })
        .catch(error => next(error))

})

app.get("/api/persons", (request, response, next) => { // GET PERSONS

    Person.find({})
        .then(result => {
            response.json(result)
        })
        .catch(error => next(error))

})

app.get("/api/persons/:id", (request, response, next) => { // GET PERSONS/ID

    Person.findById(request.params.id)
        .then(result => {
            response.json(result)
        })
        .catch(error => next(error))

})

app.post("/api/persons", (request, response, next) => { // POST
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: "Name missing"
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: "Number missing"
        })
    }
    const person = new Person({
        id: null,
        name: body.name,
        number: body.number,
        important: true
    })

    if (!body.id) { // Random ID
        person.id = generateIdRandom()
    } else { // Specific ID
        person.id = body.id
    }

    person.save()
        .then(result => {
            console.log("Added " + result.name + " with the number " + result.number + " into the database")
            response.json(result)
        })
        .catch(error => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: "Name missing"
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: "Number missing"
        })
    }

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(
        request.params.id,
        person,
        { new: true, runValidators: true, context: "query" })
        .then(result => {
            response.json(result)
        })
        .catch(error => next(error))

})

const generateIdRandom = () => { // Random number
    return Math.floor(Math.random() * 9999)
}

app.delete("/api/persons/:id", (request, response, next) => { // DELETE

    Person.findByIdAndRemove(request.params.id)
        .then(response.status(204).end())
        .catch(error => next(error))

})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "Unknown endpoint 404" })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === "CastError") {
        return response.status(400).send({ error: "Item with this ID doesnt exist" })
    } else if (error.name === "ValidationError") {
        return response.status(400).send({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})