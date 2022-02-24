const Course = (props) => {
    return (
      <div>
        <Header content={props.name} />
        <Content content={props.content} />
        <Total content={props.content} />
      </div>
    )
  }
  
  const Header = (props) => {
  
    return (
      <h1>{props.content}</h1>
    )
  }
  
  const Content = (props) => {
  
    return (
  
      props.content.map(content => <Part key={content.id} content={content} />)
    )
  }
  
  const Part = (props) => {
  
    console.log(props)
  
    return (
      <p>{props.content.name} {props.content.exercises} </p>
    )
  }
  
  const Total = (props) => {
  
    var total = 0
    const parts = props.content
  
    total = parts.reduce(function (sum, part) {
      return sum + part.exercises
    }, 0)
  
  
    //props.parts.reduce((s, p) => console.log(s,p) || someMagicHere)
  
    return (
      <p><b>Combined total of {total} exercises</b></p>
    )
  }

export default Course