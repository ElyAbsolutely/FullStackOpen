import { useQuery } from "@apollo/client"

import { ALL_BOOKS } from "../../queries"

const Specific = ({ genre, setErrorMessage }) => {
    var books

    books = useQuery(ALL_BOOKS, {
        variables: { genres: genre.toLowerCase() },
        onError: (error) => {
            setErrorMessage(error.graphQLErrors[0].message)
        },
    })

    if (books.loading)
        return <div>Loading...</div>

    return (
        <table>
            <tbody>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Published</th>
                </tr>
                {books.data.allBooks.map((a) => {
                    return (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author}</td>
                            <td>{a.published}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Specific