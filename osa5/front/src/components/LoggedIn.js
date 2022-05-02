import React from "react"

const LoggedIn = (props) => {
    return (
        <div>
            <p>Logged in as {props.name}</p>
            <button onClick={props.action}>Logout</button>
        </div>
    )
}

export default LoggedIn