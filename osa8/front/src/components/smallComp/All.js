import { useQuery } from "@apollo/client"

import { ALL_BOOKS } from "../../queries"

const All = () => {
    var books

    books = useQuery(ALL_BOOKS)

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

export default All