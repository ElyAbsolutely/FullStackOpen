import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote(state, action) {
      console.log("Action: ", action)
      return state.map(anecdote => (anecdote.id === action.payload.id) ? action.payload : anecdote).sort(function (a, b) { return b.votes - a.votes })
    },
    addSingle(state, action) {
      console.log("Action: ", action)
      state.push(action.payload)
    },
    addAll(state, action) {
      console.log("Action: ", action)
      return action.payload.sort(function (a, b) { return b.votes - a.votes })
    }
  }
})

export const { vote, addSingle, addAll } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const returnedAnecdotes = await anecdoteService.getAll()
    dispatch(addAll(returnedAnecdotes))
  }
}

export const postAnecdote = (item) => {
  return async dispatch => {
    const returnedAnecdote = await anecdoteService.addNew(item)
    dispatch(addSingle(returnedAnecdote))
  }
}

export const voteAnecdote = (item) => {

  const newItem = {
    ...item,
    votes: item.votes + 1
  }

  return async dispatch => {
    const returnedAnecdote = await anecdoteService.vote(newItem)
    dispatch(vote(returnedAnecdote))
  }
}

export default anecdoteSlice.reducer

/*
const sorter = (array) => {
  return array.sort(function (a, b) { return b.votes - a.votes })
}
*/

/*
const anecdoteReducer = (state = initialState, action) => {
  console.log("State: ", state)
  console.log("Action: ", action)

  switch (action.type) {

    case "VOTE":

      const votedAnecdote = state.find(anecdote => anecdote.id === action.data.id)
      votedAnecdote.votes++
      var stateVote = state.map(anecdote => (anecdote.id === votedAnecdote.id) ? votedAnecdote : anecdote)
      stateVote = sorter(stateVote)
      return stateVote

    case "CREATE":

      const item = asObject(action.data.anecdote)
      var stateCreate = state.concat(item)
      stateCreate = sorter(stateCreate)
      return stateCreate

    default:
      return state
  }
}

export const vote = (id) => {
  return {
    type: "VOTE",
    data: {
      id
    }
  }
}

export const create = (anecdote) => {
  return {
    type: "CREATE",
    data: {
      anecdote
    }
  }
}
*/