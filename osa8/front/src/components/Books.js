import { useState } from "react"
import { useQuery } from "@apollo/client"

import { ME } from "../queries"

import All from "./smallComp/All"
import Specific from "./smallComp/Specific"

const Books = ({ show, setErrorMessage }) => {
    const me = useQuery(ME, {
        onError: (error) => {
            setErrorMessage(error.graphQLErrors[0].message)
        },
    })

    const [genre, setGenre] = useState("None chosen")

    if (!show)
        return null

    console.log("me:", me)

    if (genre === "None chosen")
        return (
            <div>
                <h2>Books</h2>

                <p>Showing books that contains genre: {genre}</p>

                <div>
                    <button onClick={() => setGenre("Refactoring")}>Refactoring</button>
                    <button onClick={() => setGenre("Agile")}>Agile</button>
                    <button onClick={() => setGenre("Patterns")}>Patterns</button>
                    <button onClick={() => setGenre("Design")}>Design</button>
                    <button onClick={() => setGenre("Classic")}>Classic</button>
                    <button onClick={() => setGenre("Crime")}>Crime</button>
                    <button onClick={() => setGenre("Revolution")}>Revolution</button>
                    <button onClick={() => setGenre("Funny")}>Funny</button>
                    <button onClick={() => setGenre(me.data.me.favoriteGenre)}>Recommend</button>
                    <button onClick={() => setGenre("None chosen")}>All</button>
                </div>

                <All setErrorMessage={setErrorMessage} />
            </div>
        )
    else
        return (
            <div>
                <h2>Books</h2>

                <p>Showing books that contains genre: {genre}</p>

                <div>
                    <button onClick={() => setGenre("Refactoring")}>Refactoring</button>
                    <button onClick={() => setGenre("Agile")}>Agile</button>
                    <button onClick={() => setGenre("Patterns")}>Patterns</button>
                    <button onClick={() => setGenre("Design")}>Design</button>
                    <button onClick={() => setGenre("Classic")}>Classic</button>
                    <button onClick={() => setGenre("Crime")}>Crime</button>
                    <button onClick={() => setGenre("Revolution")}>Revolution</button>
                    <button onClick={() => setGenre("Funny")}>Funny</button>
                    <button onClick={() => setGenre(me.data.me.favoriteGenre)}>Recommend</button>
                    <button onClick={() => setGenre("None chosen")}>All</button>
                </div>

                <Specific genre={genre} setErrorMessage={setErrorMessage} />
            </div>
        )
}

export default Books
