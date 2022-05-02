import { connect } from "react-redux"

const Notification = (props) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  }

  if (props.show === true)
    return (
      <div style={style}>
        {props.message}
      </div>
    )
  else
    return null
}

const mapStateToProps = (state) => { return state.messages }

const ConnectedMessages = connect(mapStateToProps)(Notification)

export default ConnectedMessages 