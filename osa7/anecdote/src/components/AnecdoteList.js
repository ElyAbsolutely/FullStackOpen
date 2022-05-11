const AnecdoteList = (props) => {
    const Link = props.Link

    return (
        < div >
            <h2>Anecdotes</h2>
            <ul>
                {props.anecdotes.map(anecdote =>
                    <li key={anecdote.id} ><Link to={"/anecdotes/" + anecdote.id}>{anecdote.content}</Link></li>
                )}
            </ul>
        </div >
    )
}

export default AnecdoteList