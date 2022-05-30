const { UserInputError } = require("apollo-server")
const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()
const jwt = require("jsonwebtoken")

const Author = require("./models/author")
const Book = require("./models/book")
const User = require("./models/user")

const JWT_SECRET = "bazinga"

const resolvers = {
    Query: {
        authorCount: () => Author.collection.countDocuments(),
        bookCount: () => Book.collection.countDocuments(),
        allAuthors: async () => await Author.find({}),
        allBooks: async (root, args) => {
            if (Object.keys(args).length === 0)

                return await Book.find({})

            else if (Object.keys(args).length === 2)

                return await Book.find({ author: args.author, genres: args.genres })

            else if (Object.keys(args).length === 1 && "author" in args)

                return await Book.find({ author: args.author })

            else if (Object.keys(args).length === 1 && "genres" in args)

                return await Book.find({ genres: args.genres })

        },
        findAuthor: async (root, args) => await Author.findOne({ name: args.name }),
        findBook: async (root, args) => await Book.findOne({ title: args.title }),
        me: (root, args, context) => { return context.currentUser }
    },
    Author: {
        name: (root) => {
            return root.name
        },
        born: (root) => {
            return root.born
        },
        bookCount: async (root) => {
            return root.books.length
        },
    },
    Mutation: {
        addBook: async (root, args, context) => {
            console.log(args)
            const book = new Book({ ...args })

            const currentUser = context.currentUser
            if (!currentUser)
                return null

            if (await Book.findOne({ title: args.title }))
                return null

            book.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })

            const prevAuthor = await Author.findOne({ name: args.author })

            if (!prevAuthor) {
                const author = new Author({ name: args.author, books: [book.title] })
                author.save()
                    .catch(error => {
                        throw new UserInputError(error.message, {
                            invalidArgs: args,
                        })
                    })

                pubsub.publish("AUTHOR_ADDED", { authorAdded: author })
            } else {
                prevAuthor.books.push(book.title)
                prevAuthor.save()
                    .catch(error => {
                        throw new UserInputError(error.message, {
                            invalidArgs: args,
                        })
                    })
            }

            pubsub.publish("BOOK_ADDED", { bookAdded: book })

            return book
        },
        editAuthor: async (root, args, context) => {
            const author = await Author.findOne({ name: args.name })
            author.born = args.born

            const currentUser = context.currentUser
            if (!currentUser)
                throw new AuthenticationError("Not authenticated")

            author.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })

            return author
        },
        createUser: async (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

            if (await User.findOne({ username: args.username }))
                return null

            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            console.log("username: ", args.username, ", password: ", args.password)

            if (!user || args.password !== "secret")
                throw new UserInputError("Wrong credentials")

            const userForToken = { username: user.username, id: user._id }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"])
        },
        authorAdded: {
            subscribe: () => pubsub.asyncIterator(["AUTHOR_ADDED"])
        },
    },
}

module.exports = resolvers