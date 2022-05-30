const { gql } = require("apollo-server")

const typeDefs = gql`
    type Author {
        name: String!
        born: Int
        id: ID
        books: [String]
        bookCount: Int
    }

    type Book {
        title: String!
        published: Int!
        author: String!
        id: ID
        genres: [String]!
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID
    }

    type Token {
        value: String!
    }

    type Query {
        authorCount: Int!
        bookCount: Int!
        allAuthors: [Author]!
        allBooks(author: String, genres: String): [Book]!
        findAuthor(name: String!): Author!
        findBook(title: String!): Book!
        me: User
    }

    type Mutation {
        addBook(title: String!, published: Int!, author: String!, genres: [String]!): Book
        editAuthor(name: String!, born: Int!): Author
        createUser(username: String!, favoriteGenre: String!): User
        login(username: String!, password: String!): Token
    }

    type Subscription {
        bookAdded: Book!
        authorAdded: Author!
    }
`

module.exports = typeDefs