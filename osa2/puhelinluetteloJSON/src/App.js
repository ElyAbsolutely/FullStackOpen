import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([
  ])

  const [newName, setNewName] = useState("A")
  const [newNumber, setNewNumber] = useState("1")
  const [filter, setFilter] = useState("")
  const [savedFilter, setSavedFilter] = useState("")

  const hook = () => {
    console.log("hookkaus")
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log("hookki toimi")
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const changeInputFilter = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  const processFilter = (event) => {
    event.preventDefault()

    setSavedFilter(filter)
  }

  const changeInputName = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const changeInputNumber = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (newName === "" || newNumber === "")
      return

    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        alert(newName + " on jo listassa")
        return
      } else if (persons[i].number === newNumber) {
        alert(newNumber + " on jo listassa")
        return
      }
    }

    const thisGuy = {
      name: newName,
      number: newNumber,
      id: persons.length,
    }

    setPersons(persons.concat(thisGuy))

    setNewName("")
    setNewNumber("")

    console.log("kaikki ihmiset (yhen jäljessä)", persons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter content={[processFilter, filter, changeInputFilter, savedFilter]} />
      <FilterUI content={savedFilter} />
      <PersonForm content={[addPerson, newName, changeInputName, newNumber, changeInputNumber]} />
      <h2>List</h2>
      {persons.map(person =>
        <Listing key={person.id} name={person.name} number={person.number} filter={savedFilter} />)}
    </div>
  )
}

const PersonForm = (props) => {

  return (
    <form onSubmit={props.content[0]}>
      <div>
        Name: <input
          value={props.content[1]}
          onChange={props.content[2]} />
      </div>
      <div>
        Phone number: <input
          value={props.content[3]}
          onChange={props.content[4]} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

const Filter = (props) => {

  if (props.filter === "")
    props.filter = "None set"

  return (
    <div>
      <form onSubmit={props.content[0]}>
        <div>
          Filter: <input
            value={props.content[1]}
            onChange={props.content[2]} />
        </div>
        <div>
          <button type="submit">Process</button>
        </div>
      </form>
    </div>
  )
}

const FilterUI = (props) => {
  if (props.content === "")
    return (
      <p> No filters Set</p>
    )
  return (
    <p> Searching for names that contains: {props.content}</p>
  )
}

const Listing = (props) => {

  if (props.filter === "") { }
  else if (!(props.name.toUpperCase().indexOf(props.filter.toUpperCase()) > -1))
    return null

  return (
    <p>{props.name} {props.number}</p>
  )
}

export default App

/*const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 0 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 1 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 2 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 3 }
  ])

  const [newName, setNewName] = useState("A")
  const [newNumber, setNewNumber] = useState("1")
  const [filter, setFilter] = useState("")
  const [savedFilter, setSavedFilter] = useState("")

  const changeInputFilter = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  const processFilter = (event) => {
    event.preventDefault()

    setSavedFilter(filter)
  }

  const changeInputName = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const changeInputNumber = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (newName === "" || newNumber === "")
      return

    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        alert(newName + " on jo listassa")
        return
      } else if (persons[i].number === newNumber) {
        alert(newNumber + " on jo listassa")
        return
      }
    }

    const thisGuy = {
      name: newName,
      number: newNumber,
      id: persons.length,
    }

    setPersons(persons.concat(thisGuy))

    setNewName("")
    setNewNumber("")

    console.log("kaikki ihmiset (yhen jäljessä)", persons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter content={[processFilter, filter, changeInputFilter, savedFilter]} />
      <FilterUI content={savedFilter} />
      <PersonForm content={[addPerson, newName, changeInputName, newNumber, changeInputNumber]} />
      <h2>List</h2>
      {persons.map(person =>
        <Listing key={person.id} name={person.name} number={person.number} filter={savedFilter} />)}
    </div>
  )
}

const PersonForm = (props) => {

  return (
    <form onSubmit={props.content[0]}>
      <div>
        Name: <input
          value={props.content[1]}
          onChange={props.content[2]} />
      </div>
      <div>
        Phone number: <input
          value={props.content[3]}
          onChange={props.content[4]} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

const Filter = (props) => {

  if (props.filter === "")
    props.filter = "None set"

  return (
    <div>
      <form onSubmit={props.content[0]}>
        <div>
          Filter: <input
            value={props.content[1]}
            onChange={props.content[2]} />
        </div>
        <div>
          <button type="submit">Process</button>
        </div>
      </form>
    </div>
  )
}

const FilterUI = (props) => {
  if (props.content === "")
    return (
      <p> No filters Set</p>
    )
  return (
    <p> Searching for names that contains: {props.content}</p>
  )
}

const Listing = (props) => {

  if (props.filter === "") { }
  else if (!(props.name.toUpperCase().indexOf(props.filter.toUpperCase()) > -1))
    return null

  return (
    <p>{props.name} {props.number}</p>
  )
}

export default App*/