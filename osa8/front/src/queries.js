import { gql } from "@apollo/client"

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        published
        author
        id
        genres
    }
`

export const FIND_PERSON = gql`
    query findBookByTitle($title: String!) {
        findBook(title: $title) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS }
`

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name,
            id,
            born,
            books,
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query ($author: String, $genres: String){
        allBooks(author: $author, genres: $genres) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
    mutation EditorAuthor($name: String!, $born: Int!) { 
        editAuthor(name: $name, born: $born) {
            name,
            born
        }
    }
`

export const CREATE_BOOK = gql`
    mutation CreateBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) { 
        addBook(title: $title, published: $published, author: $author, genres: $genres) {
            title,
            published,
            author
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) { 
        login(username: $username, password: $password) {
            value
        }
    }
`

export const ME = gql`
    query {
        me {
            username,
            favoriteGenre,
            id
        }
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`

export const AUTHOR_ADDED = gql`
    subscription {
        authorAdded {
            name,
            id,
            born,
            books,
            bookCount
        }
    }
`