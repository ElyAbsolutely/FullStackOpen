import React, { useState } from "react"
import PropTypes from "prop-types"

const LogIn = ({ action }) => {

    const [logName, setLogName] = useState("")
    const [logPassword, setLogPassword] = useState("")

    const changeInputLogName = (event) => {
        event.preventDefault()
        setLogName(event.target.value)
    }
    const changeInputLogPassword = (event) => {
        event.preventDefault()
        setLogPassword(event.target.value)
    }

    const logIn = (event) => {
        event.preventDefault()

        action({
            username: logName, password: logPassword
        })
        setLogName("")
        setLogPassword("")
    }

    return (
        <div>
            <h3>Please log in</h3>
            <form onSubmit={logIn}>
                <div>
                    Username: <input
                        id="inputLoginUsername"
                        value={logName}
                        onChange={changeInputLogName} />
                </div>
                <div>
                    Password: <input
                        id="inputLoginPassword"
                        value={logPassword}
                        onChange={changeInputLogPassword} />
                </div>
                <div>
                    <button id="loginSubmit" type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

LogIn.propTypes = {
    logName: PropTypes.string.isRequired,
    logPassword: PropTypes.string.isRequired,

    changeInputLogPassword: PropTypes.func.isRequired,
    changeInputLogName: PropTypes.func.isRequired
}

export default LogIn