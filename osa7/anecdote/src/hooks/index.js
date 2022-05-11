import { useState } from "react"

const array = [{
    content: "If it hurts, do it more often",
    author: "Jez Humble",
    info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
    votes: 0,
    id: 1
},
{
    content: "Premature optimization is the root of all evil",
    author: "Donald Knuth",
    info: "http://wiki.c2.com/?PrematureOptimization",
    votes: 0,
    id: 2
}]

export const useCounterAnecdotes = () => {
    const [anecdotes, setAnecdotes] = useState(array)

    const anecdoteById = (id) =>
        anecdotes.find(a => a.id === id)

    const add = (anecdote) => {
        setAnecdotes(anecdotes.concat(anecdote))
    }

    const vote = (id) => {
        const anecdote = anecdoteById(id)

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        }

        setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    }

    return {
        anecdotes,
        add,
        vote
    }
}

export const useCounterNotifications = () => {
    const [notification, setNotification] = useState("")

    const add = (message) => {
        setNotification(message)
    }

    const clear = () => {
        setNotification("")
    }

    return {
        notification,
        add,
        clear
    }
}

export const useCounterCreateInputs = () => {
    const [content, setContent] = useState("")
    const [author, setAuthor] = useState("")
    const [info, setInfo] = useState("")

    const values = {
        content,
        author,
        info
    }

    const changeContent = (input) => {
        setContent(input)
    }

    const changeAuthor = (input) => {
        setAuthor(input)
    }

    const changeInfo = (input) => {
        setInfo(input)
    }

    const clear = () => {
        setContent("")
        setAuthor("")
        setInfo("")
    }

    return {
        values,
        changeContent,
        changeAuthor,
        changeInfo,
        clear
    }
}