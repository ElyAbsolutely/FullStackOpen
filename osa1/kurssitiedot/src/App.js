const App = () => {

  const course = {

    name: "Half Stack application development",
    parts: [

      {
        name: "Fundamentals of React",
        exercises: 10,
      },

      {
        name: "Using props to pass data",
        exercises: 7,
      },

      {
        name: "State of a component",
        exercises: 14,
      }
    ],
  }

  console.log(course)

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {

  console.log(props)

  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {

  console.log(props)

  return (
    <div>
      <Part osio={props.parts[0]} />
      <Part osio={props.parts[1]} />
      <Part osio={props.parts[2]} />
    </div>
  )
}

const Part = (props) => {

  console.log(props)

  return (
    <p>{props.osio.name + " " + props.osio.exercises}</p>
  )
}

const Total = (props) => {

  console.log(props)

  const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises

  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}

export default App