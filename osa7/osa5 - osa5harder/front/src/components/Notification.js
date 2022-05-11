import { connect } from "react-redux"
import { Alert } from "@mui/material"

const Notification = (props) => {
    const style = {
        border: "solid",
        padding: 10,
        borderWidth: 1,
    }

    if (props.show === true) return <Alert style={style}>{props.message}</Alert>
    else return null
}

const mapStateToProps = (state) => {
    return state.messages
}

const ConnectedMessages = connect(mapStateToProps)(Notification)

export default ConnectedMessages