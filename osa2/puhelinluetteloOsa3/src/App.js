import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([
  ])

  const [newName, setNewName] = useState("A")
  const [newNumber, setNewNumber] = useState("1")
  const [filter, setFilter] = useState("")
  const [savedFilter, setSavedFilter] = useState("")
  const [confirmationUI, setUI] = useState([null, "none"])

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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

  const addPerson = (event) => { // Add a person or change number
    event.preventDefault()

    if (newName === "" || newNumber === "")
      return

    const thisGuy = {
      name: newName,
      number: newNumber,
      id: persons.length,
      important: true
    }

    const person = persons.find(p => p.name === thisGuy.name)

    if (person == null || person.important == false) {
      personService // Add a person
        .create(thisGuy)
        .then(returnedPerson => {
          setPersons(persons.concat(thisGuy))
          setNewName('')
          setNewNumber('')
          setUI([thisGuy.name + " added", "success"])
          setTimeout(() => {
            setUI([null, "none"])
          }, 3500)
        })
        .catch(error => {
          setUI(["Unknown error", "fail"])
          setTimeout(() => {
            setUI([null, "none"])
          }, 3500)
          return
        })
    } else if (person.name === thisGuy.name) {
      if (window.confirm("Replace the number of " + person.name + "?")) {

        personService
          .update(person.id, thisGuy)
          .then(returnedContact => {
            thisGuy.id = person.id
            setPersons(persons.map(p => p.id !== person.id ? p : thisGuy))
            setUI([thisGuy.name + "´s number changed", "success"])
            setTimeout(() => {
              setUI([null, "none"])
            }, 3500)
          })
          .catch(error => {
            setUI([thisGuy.name + " has been already deleted", "fail"])
            thisGuy.id = person.id; thisGuy.important = false
            setPersons(persons.map(p => p.id !== person.id ? p : thisGuy))
            setTimeout(() => {
              setUI([null, "none"])
            }, 3500)
            return
          })
      }
    }
  }

  const deletePerson = (event) => { // Delete person
    event.preventDefault()

    if (window.confirm("Remove item?")) {

      personService
        .remove(event.target.value)
        .catch(error => {
          setUI(["Unknown error", "fail"])
          setTimeout(() => {
            setUI([null, "none"])
          }, 3500)
          return
        })


      const person = persons.find(p => p.name === persons[event.target.value].name)

      const thisGuy = {
        name: persons[event.target.value].name,
        number: persons[event.target.value].number,
        id: persons[event.target.value].id,
        important: false
      }

      setPersons(persons.map(p => p.id !== person.id ? p : thisGuy))
      setUI([thisGuy.name + " has been deleted", "success"])
      setTimeout(() => {
        setUI([null, "none"])
      }, 3500)
    }
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter content={[processFilter, filter, changeInputFilter]} />
      <FilterUI content={savedFilter} />

      <UI content={confirmationUI} />

      <PersonForm content={[addPerson, newName, changeInputName, newNumber, changeInputNumber]} />
      <h2>List</h2>
      {persons.map(person =>
        <Listing id={person.id} important={person.important} name={person.name} number={person.number} filter={savedFilter} function={deletePerson} />)}
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

  if (!(props.important))
    return null

  return (
    <p>{props.name} {props.number} <button value={props.id} onClick={props.function}>Delete</button></p>
  )
}

const UI = (props) => {

  if (props.content[1] == "none")
    return null

  const message = props.content[0]

  return (
    <div className={props.content[1]}>
      <p>{message}</p>
    </div>
  )
}

export default App