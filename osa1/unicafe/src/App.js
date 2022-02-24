import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Clickplus = () => setGood(good + 1)
  const Clickneutral = () => setNeutral(neutral + 1)
  const Clickbad = () => setBad(bad + 1)

  return (
    <div>
      <Header />
      <Button text={"Hyvä"} action={Clickplus} />
      <Button text={"Tasapuolinen"} action={Clickneutral} />
      <Button text={"Huono"} action={Clickbad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Header = () => {

  return (
    <div>
      <h1>UNICAFE</h1>
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

const Statistics = (props) => {

  console.log(props)

  const total = props.good + props.neutral + props.bad

  if (total > 0) {

    const part = 100 / total

    const average = ((part * props.good) + ((part * props.neutral) / 2)).toFixed(1)

    const percentage = ((props.good * 100 / total).toFixed(2)) + " %"

    return (
      <div>
        <h2>Tilastot</h2>
        <table><tbody>
          <StatisticLine text={"Hyvä: "} num={props.good} />
          <StatisticLine text={"Tasapuolinen: "} num={props.neutral} />
          <StatisticLine text={"Huono: "} num={props.bad} />
          <StatisticLine text={"Yhteensä: "} num={total} />
          <StatisticLine text={"AVG: "} num={average} />
          <StatisticLine text={"Hyvä%: "} num={percentage} />
        </tbody></table>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Tilastot</h2>
        <p>Tyhjä</p>
      </div>
    )
  }
}

const StatisticLine = (props) => {

  console.log(props)

  return (
    <tr>
      <td>
        {props.text}
      </td>
      <td>
        {props.num}
      </td>
    </tr>
  )
}

export default App