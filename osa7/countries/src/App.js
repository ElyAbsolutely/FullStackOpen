import { useState, useEffect } from "react"
import axios from "axios"

import Country from "./components/Country"

const useField = (type) => {
  const [value, setValue] = useState("")

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    console.log("hookkaus (maat)")
    axios
      .get("https://restcountries.com/v3.1/name/" + name + "?fullText=true")
      .then(response => {
        console.log("hookki (maat) toimi", response.data)
        if (!response.data)
          return
        setCountry(response.data[0])
      })
      .catch(() => {
        console.error("No matches found");
      })
  }, [name])

  return country
}

const App = () => {
  const nameInput = useField("text")
  const [name, setName] = useState("")
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type={"submit"}>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
