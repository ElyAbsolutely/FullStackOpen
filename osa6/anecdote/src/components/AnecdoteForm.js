import { connect } from "react-redux"

import { postAnecdote } from "../reducers/anecdoteReducer"
import { postmanPat } from "../reducers/messageReducer"

const AnecdoteForm = ({ postAnecdote, postmanPat }) => {
    const createAnecdote = async (event) => {
        event.preventDefault()

        const input = event.target.anecdote.value
        event.target.anecdote.value = ""
        const item = asObject(input)

        postAnecdote(item)

        postmanPat("Created anecdote " + item.content, 5)
    }

    const generateRandomId = () => (100000 * Math.random()).toFixed(0)

    const asObject = (anecdote) => {
        return {
            content: anecdote,
            id: generateRandomId(),
            votes: 0
        }
    }

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={createAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = { postAnecdote, postmanPat }

const ConnectedDispatches = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedDispatches