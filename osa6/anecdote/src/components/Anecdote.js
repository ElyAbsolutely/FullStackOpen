import { useDispatch } from "react-redux"

import { postmanPat } from "../reducers/messageReducer"
import { voteAnecdote } from "../reducers/anecdoteReducer"

const Anecdote = (props) => {
    const dispatch = useDispatch()

    const anecdote = props.anecdote

    const voteEvent = (item) => {
        dispatch(voteAnecdote(item))
        dispatch(postmanPat("Voted " + item.content, 5))
    }

    return (
        <div>
            <h4>{anecdote.content}</h4>
            <p>has <b>{anecdote.votes}</b> likes <button onClick={() => voteEvent(anecdote)} >Vote</button></p>
        </div>
    )
}

export default Anecdote