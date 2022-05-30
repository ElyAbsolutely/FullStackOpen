import { useState, useEffect } from "react"
import { useApolloClient, useSubscription } from "@apollo/client"

import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"

import { BOOK_ADDED } from "./queries"
import { AUTHOR_ADDED } from "./queries"
import { ALL_BOOKS } from "./queries"
import { ALL_AUTHORS } from "./queries"

export const updateCache = (cache, query, addable, type) => {
    if (type === "book") {
        const uniqByName = (a) => {
            let seen = new Set()
            return a.filter((item) => {
                let k = item.title
                return seen.has(k) ? false : seen.add(k)
            })
        }
        cache.updateQuery(query, ({ allBooks }) => {
            return {
                allBooks: uniqByName(allBooks.concat(addable)),
            }
        })
    } else if (type === "author")
        cache.updateQuery(query, ({ allAuthors }) => {
            return {
                allAuthors: allAuthors.concat(addable),
            }
        })
}

export const updateCacheAuthor = (cache, query, addedAuthor) => {
    cache.updateQuery(query, ({ allAuthors }) => {
        return {
            allAuthors: allAuthors.concat(addedAuthor),
        }
    })
}

const App = () => {
    const [page, setPage] = useState("authors")
    const [token, setToken] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const client = useApolloClient()

    const logout = () => {
        setPage("authors")
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const addedBook = subscriptionData.data.bookAdded
            console.log("subscription-book:", addedBook)
            window.alert("New book added: ", addedBook.title)

            updateCache(client.cache, { query: ALL_BOOKS }, addedBook, "book")
        }
    })

    useSubscription(AUTHOR_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const addedAuthor = subscriptionData.data.authorAdded
            console.log("subscription-author:", addedAuthor)

            updateCache(client.cache, { query: ALL_AUTHORS }, addedAuthor, "author")
        }
    })

    useEffect(() => {
        if (localStorage.getItem("phonenumbers-user-token")) {
            console.log("Token:", localStorage.getItem("phonenumbers-user-token"))
            setToken(localStorage.getItem("phonenumbers-user-token"))
        }
    }, []) // eslint-disable-line

    return (
        <div>
            <div>
                {!token
                    ?
                    <div>
                        <button onClick={() => setPage("authors")}>Authors</button>
                        <button onClick={() => setPage("books")}>Books</button>
                        <button onClick={() => setPage("login")}>Log In</button>
                    </div>
                    :
                    <div>
                        <button onClick={() => setPage("authors")}>Authors</button>
                        <button onClick={() => setPage("books")}>Books</button>
                        <button onClick={() => setPage("add")}>Add book</button>
                        <button onClick={logout}>Log out</button>
                    </div>
                }
            </div>

            <Notification errorMessage={errorMessage} />

            <LoginForm show={page === "login"} setPage={setPage} setToken={setToken} setErrorMessage={setErrorMessage} />

            <Authors show={page === "authors"} token={token} setErrorMessage={setErrorMessage} />

            <Books show={page === "books"} setErrorMessage={setErrorMessage} />

            <NewBook show={page === "add"} setPage={setPage} setErrorMessage={setErrorMessage} />
        </div>
    )
}

export default App