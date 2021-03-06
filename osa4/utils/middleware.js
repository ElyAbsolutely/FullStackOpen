const logger = require("./logger")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

const tokenExtractor = (request, response, next) => {
    const authorization = request.get("authorization")

    if (authorization && authorization.toLowerCase().startsWith("bearer "))
        request.token = authorization.substring(7)
    else
        request.token = null

    next()
}

const userExtractor = async (request, response, next) => {
    if (!(request.token === null)) {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        const user = await User.findById(decodedToken.id)
        request.user = user
    }
    next()
}


const requestLogger = (request, response, next) => {
    logger.info("Method:", request.method)
    logger.info("Path:  ", request.path)
    logger.info("Body:  ", request.body)
    logger.info("---")
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "Unknown endpoint 404" })
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === "CastError")
        return response.status(400).send({ error: "Item with this ID doesnt exist" })
    else if (error.name === "ValidationError")
        return response.status(400).send({ error: error.message })
    else if (error.name === "JsonWebTokenError")
        return response.status(401).json({ error: "Invalid token" })
    else if (error.name === "TokenExpiredError")
        return response.status(401).json({ error: "Token expired" })

    next(error)
}

module.exports = {
    tokenExtractor, userExtractor, requestLogger, unknownEndpoint, errorHandler
}