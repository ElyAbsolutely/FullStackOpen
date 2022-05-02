import { useSelector } from "react-redux"

import  Anecdote  from "./Anecdote"

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes }) => {
        return anecdotes
    })

    const filter = useSelector(({ filter }) => {
        return filter.filter
    })

    const filterer = (anecdote) => {
        if (filter === null)
            return true
        if (!anecdote.includes(filter))
            return false
        return true
    }

    const getFilter = () => {
        if (filter === null)
            return "No filter"
        else
            return filter
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            <p><b>Current filter:</b> {getFilter()}</p>
            {anecdotes.map(anecdote =>
                filterer(anecdote.content) ?
                    <Anecdote key={anecdote.id} anecdote={anecdote}/>
                    :
                    <div />
            )}
        </div >
    )
}

export default AnecdoteList