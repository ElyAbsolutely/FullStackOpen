import React from "react"
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom"

import AnecdoteList from "./components/AnecdoteList"
import Menu from "./components/Menu"
import About from "./components/About"
import Footer from "./components/Footer"
import CreateNew from "./components/CreateNew"
import Notification from "./components/Notification"
import { useCounterAnecdotes, useCounterNotifications } from "./hooks/index"

const Anecdote = (props) => {
  const id = useParams().id
  const anecdote = props.anecdotes.find(a => a.id === Number(id))

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>Author: {anecdote.author}</p>
      <p>Votes: {anecdote.votes} <button onClick={() => props.vote(anecdote.id)}>Vote</button></p>
      <a href="https://www.w3schools.com/tags/tag_a.asp">{anecdote.info}</a>
      <p>ID: {anecdote.id}</p>
    </div>
  )
}

var timer

const App = () => {
  const navigate = useNavigate()
  const anecdotes = useCounterAnecdotes()
  const notification = useCounterNotifications()

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    anecdotes.add(anecdote)
    setMessage("Created: " + anecdote.content)
    navigate("/")
  }

  const vote = (id) => {
    anecdotes.vote(id)
    setMessage("Liked: " + id)
  }

  const setMessage = (message) => {
    notification.add(message)

    clearTimeout(timer)

    timer = setTimeout(() => {
      notification.clear()
    }, 5000)
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu Link={Link} />

      <Notification n={notification.notification} />

      <Routes>
        <Route path="/" element={<AnecdoteList Link={Link} anecdotes={anecdotes.anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes.anecdotes} vote={vote} />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App