const { ApolloServer } = require("apollo-server-express")
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const { execute, subscribe } = require("graphql")
const { SubscriptionServer } = require("subscriptions-transport-ws")
const express = require("express")
const http = require("http")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const MONGODB_URI = "" // Insert mongo link here
const JWT_SECRET = "bazinga"

const typeDefs = require("./schema")
const resolvers = require("./resolvers")
const User = require("./models/user")

console.log("Connecting to", MONGODB_URI)
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((error) => {
        console.log("Error connection to MongoDB:", error.message)
    })

const start = async () => {
    const app = express()
    const httpServer = http.createServer(app)

    const schema = makeExecutableSchema({ typeDefs, resolvers })

    const subscriptionServer = SubscriptionServer.create(
        {
            schema,
            execute,
            subscribe,
        },
        {
            server: httpServer,
            path: "",
        }
    )

    const server = new ApolloServer({
        schema,
        context: async ({ req }) => {
            const auth = req ? req.headers.authorization : null
            if (auth && auth.toLowerCase().startsWith("bearer ")) {
                const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
                const currentUser = await User.findById(decodedToken.id)
                return { currentUser }
            }
        },
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            subscriptionServer.close()
                        },
                    }
                },
            },
        ],
    })

    await server.start()

    server.applyMiddleware({
        app,
        path: "/",
    })

    const PORT = 4000

    httpServer.listen(PORT, () =>
        console.log("Server is now running on http://localhost:" + PORT)
    )
}

start()