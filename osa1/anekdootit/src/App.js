import { useState } from 'react'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
]

const parts = [ // Testing
  "Anecdote 1", "Anecdote 2", "Anecdote 3", "Anecdote 4", "Anecdote 5", "Anecdote 6", "Anecdote 7"
]


const App = () => {

  const [anecdote, setSelected] = useState(0)
  const [votes, increment] = useState([0, 0, 0, 0, 0, 0, 0])

  const Clickrandom = () => setSelected(Math.floor(Math.random() * 7))

  const Vote = () => {

    const votes2nd = votes

    console.log("1: votes " + votes + " votes2nd " + votes2nd)

    votes2nd[anecdote] = votes2nd[anecdote] + 1
    increment(votes2nd)

    console.log("2: votes " + votes + " votes2nd " + votes2nd)

  }

  return (
    <div>
      <Teksti text={parts[anecdote]} />
      <Button text={"Vaihda"} action={Clickrandom} />
      <Button text={"Äänestä"} action={Vote} />
      <br></br>
      <Teksti text={anecdotes[anecdote]} />
      <Luku num={votes[anecdote]} />
      <Best anecdote={anecdotes} votes={votes} />
    </div>
  )
}

const Best = (props) => {

  var value = 0
  var best = 0
  var score = 0

  while (value < 7) {

    if (props.votes[value] > score) {
      score = props.votes[value]
      best = value
    }

    value++
  }

  return (
    <div>
      <h2>Paras anecdote</h2>
      <p>{props.anecdote[best]}</p>
      <p>oli {props.votes[best]} ääntä</p>
    </div>
  )
}

const Button = (props) => {

  console.log(props)

  return (
    <button onClick={props.action}>
      {props.text}
    </button>
  )
}

const Button2 = (props) => {

  console.log(props)

  return (
    <button onClick={props.action}>
      {props.text}
    </button>
  )
}

const Teksti = (props) => {

  return (
    <div>
      <p>{props.text}</p>
    </div>
  )
}

const Luku = (props) => {

  console.log(props)

  return (
    <div>
      <p>oli {props.num} ääntä</p>
    </div>
  )
}

export default App