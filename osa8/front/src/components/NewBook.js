import { useState } from "react"
import { useMutation } from "@apollo/client"

import { CREATE_BOOK, ALL_BOOKS } from "../queries"
import { updateCache } from "../App"

const NewBook = ({ show, setErrorMessage, setPage }) => {
    const [genre, setGenre] = useState("")
    const [genres, setGenres] = useState([])
    const [createBook] = useMutation(CREATE_BOOK, {
        onError: (error) => {
            console.log(error)
            setErrorMessage(error.graphQLErrors[0].message)
        },
        update: async (cache, response) => {
            updateCache(cache, { query: ALL_BOOKS }, response.data.allBooks, "book")
            setPage("books")
        }
    })

    if (!show)
        return null

    const submit = async (event) => {
        event.preventDefault()

        const title = event.target.bookTitle.value
        const published = Number(event.target.bookYear.value)
        const author = event.target.bookAuthor.value

        console.log("Add book:", { title, published, author, genres })

        createBook({ variables: { title, published, author, genres } })

        event.target.bookTitle.value = ""
        event.target.bookAuthor.value = ""
        event.target.bookYear.value = ""
        setGenres([])
        setGenre("")
    }

    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre("")
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    Title
                    <input name="bookTitle" />
                </div>
                <div>
                    Author
                    <input name="bookAuthor" />
                </div>
                <div>
                    Published
                    <input type="number" name="bookYear" />
                </div>
                <div>
                    Genre
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">Add genre</button>
                </div>
                <div>Genres: {genres.join(", ")}</div>
                <button type="submit">Create book</button>
            </form>
        </div>
    )
}

export default NewBook
