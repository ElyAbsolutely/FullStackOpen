import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [countries, setCountries] = useState([
  ])

  const [filter, setFilter] = useState("")
  const [savedFilter, setSavedFilter] = useState("")

  const [api_key, setApi_key] = useState("")
  const [savedApi_key, setSavedApi_key] = useState("")

  const hook = () => {
    console.log("hookkaus (maat)")
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        console.log("hookki (maat) toimi", response.data)
        setCountries(response.data)
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

  const processNamedFilter = (event) => {
    event.preventDefault()

    setSavedFilter(event.target.name)
  }

  const changeInputApi = (event) => {
    event.preventDefault()
    setApi_key(event.target.value)
  }

  const processApi = (event) => {
    event.preventDefault()

    setSavedApi_key(api_key)
    setApi_key("")
  }


  return (
    <div>
      <h2>Countrycator</h2>
      <Api content={[processApi, api_key, changeInputApi]} />
      <ApiUI content={savedApi_key} />
      <br></br>
      <Filter content={[processFilter, filter, changeInputFilter]} />
      <FilterUI content={savedFilter} />
      <h2>List</h2>
      <List countries={countries} filter={savedFilter} function={processNamedFilter} api={savedApi_key} />
    </div>
  )
}

const Api = (props) => {

  return (
    <div>
      <form onSubmit={props.content[0]}>
        <div>
          API: <input
            value={props.content[1]}
            onChange={props.content[2]} />
        </div>
        <div>
          <button type="submit">Save API</button>
        </div>
      </form>
    </div>
  )
}

const ApiUI = (props) => {
  if (props.content === "")
    return (
      <div>
        <p> Uses OpenWeather</p>
        <p> No API keys set</p>
      </div >
    )
  return (
    <div>
      <p> Uses OpenWeather</p>
      <p> Your api code is: {props.content}</p>
    </div>
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
      <p> No filters set</p>
    )
  return (
    <p> Searching for countries that contains: {props.content}</p>
  )
}

const List = (props) => {

  let x = 0

  for (let i = 0; i < props.countries.length; i++)
    if (props.countries[i].name.common.toUpperCase().indexOf(props.filter.toUpperCase()) > -1)
      x++

  console.log(x)

  if (x == 0) {

    return (
      <p>None found</p>
    )

  } else if (x == 1) {

    var theCountry = null

    for (let i = 0; i < props.countries.length; i++)
      if (props.countries[i].name.common.toUpperCase().indexOf(props.filter.toUpperCase()) > -1) {
        theCountry = props.countries[i]
        break
      }

    return (
      <SpecifiedListing country={theCountry} api={props.api} />
    )

  } else if (x <= 10) {

    return (
      <ul>
        {props.countries.map(country =>
          <Listing name={country.name.common} region={country.region} filter={props.filter} function={props.function} />
        )}
      </ul>
    )

  } else if (x > 10) {

    return (
      <p>The filter matches too many countries</p>
    )

  }
}

const Listing = (props) => {

  if (props.filter === "" || !(props.name.toUpperCase().indexOf(props.filter.toUpperCase()) > -1))
    return null

  return (
    <li><b>Country:</b> {props.name} <b>Region:</b> {props.region}<button name={props.name} onClick={props.function}>Show more</button></li>
  )
}


const SpecifiedListing = (props) => {

  const lat = props.country.latlng[0]
  const lon = props.country.latlng[1]

  console.log(props.api)

  const [info, setNewInfo] = useState(null)

  const hook = () => {
    console.log("hookkaus (sää)")
    axios
      .get("https://api.openweathermap.org/data/2.5/weather?q=" + props.country.capital + "&units=metric&appid=" + props.api)
      .then(response => {
        console.log("hookki (sää) toimi", response.data)
        setNewInfo(response.data)
      })
  }

  useEffect(hook, [])

  const keys = Object.values(props.country.languages);

  if (info == null)
    return (
      <div>
        <h2>{props.country.name.common}</h2>
        <p><b>Region:</b> {props.country.region}</p>
        <p><b>Population:</b> {props.country.population}</p>
        <p><b>Capital:</b> {props.country.capital}</p>
        <h3>Languages</h3>
        <ul>
          {keys.map(key =>
            <li>{key}</li>
          )}
        </ul>
        <img width="200" height="200" src={props.country.flags.png} />
      </div>
    )
  else
    return (
      <div>
        <h2>{props.country.name.common}</h2>
        <p><b>Region:</b> {props.country.region}</p>
        <p><b>Population:</b> {props.country.population}</p>
        <p><b>Capital:</b> {props.country.capital}</p>
        <h3>Languages</h3>
        <ul>
          {keys.map(key =>
            <li>{key}</li>
          )}
        </ul>
        <img width="200" height="200" src={props.country.flags.png} />
        <h2>Weather in {info.name}</h2>
        <p><b>{info.weather[0].main}:</b> {info.weather[0].description}</p>
        <p><b>Temperature:</b> {info.main.temp}°C</p>
        <p><b>Wind:</b> {info.wind.speed} m/s</p>
      </div>
    )
}

export default App