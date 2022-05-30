import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"

import { EDIT_AUTHOR } from "../queries"
import { ALL_AUTHORS } from "../queries"

const Authors = ({ show, token, setErrorMessage }) => {
    const [editorAuthor] = useMutation(EDIT_AUTHOR)
    const [edAuthor, setEdAuthor] = useState(null)

    var authors = useQuery(ALL_AUTHORS, {
        onError: (error) => {
            setErrorMessage(error.graphQLErrors[0].message)
        }
    })

    if (!show)
        return null

    if (authors.loading)
        return <div>Loading...</div>

    authors = authors.data.allAuthors
    console.log("Authors:", authors)

    const submit = async (event) => {
        event.preventDefault()

        if (edAuthor === "")
            return

        const name = edAuthor
        const born = Number(event.target.inputBorn.value)

        console.log("Edit author:", { name, born })

        editorAuthor({ variables: { name, born } })

        event.target.inputBorn.value = ""
    }

    const buttonStyle = { width: "100%", height: "100%", background: "transparent", backgroundColor: "#FAFAFA", borderColor: "#CFCFCF", borderRadius: "3px" }

    return (
        <div>
            <div>
                <h2>Authors</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Author</th>
                            <th>Born</th>
                            <th>Books</th>
                        </tr>
                        {authors.map((a) => (
                            <tr key={a.name}>
                                <td><button style={buttonStyle} onClick={() => setEdAuthor(a.name)}>{a.name}</button></td>
                                <td>{a.born}</td>
                                <td>{a.bookCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {!token
                ?
                null
                :
                <div>
                    <form onSubmit={submit}>
                        <div>
                            Editing author: {edAuthor}
                        </div>
                        <div>
                            Birthyear
                            <input type="number" name="inputBorn" />
                        </div>
                        <button type="submit">Update Author</button>
                    </form>
                </div>
            }
        </div >
    )
}

export default Authors