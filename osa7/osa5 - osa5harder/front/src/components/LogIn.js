import { useRef } from "react"
import { useDispatch } from "react-redux"
import { Container, TextField, Button } from "@mui/material"

import Togglable from "./Togglable"

import { logIn } from "../reducers/loggedReducer"
import { postmanPat } from "../reducers/messageReducer"

const LogIn = () => {
    const dispatch = useDispatch()

    const logIn01 = (event) => {
        event.preventDefault()

        const username = event.target.username.value
        const password = event.target.password.value

        logIn02({
            username: username, password: password
        })

        event.target.username.value = ""
        event.target.password.value = ""
    }

    const logIn02 = async (loginForm) => {
        try {
            dispatch(logIn(loginForm))
            loginFormRef.current.toggleVisibility()

            dispatch(postmanPat("Logged in as " + loginForm.username, 4))
        } catch (e) {
            console.log(e)
            dispatch(postmanPat("Wrong username or password", 4))
        }
    }

    const loginFormRef = useRef()

    return (
        <Container>
            <Togglable buttonLabel="Login as user" ref={loginFormRef}>
                <h3>Please log in</h3>
                <form onSubmit={logIn01}>
                    <TextField
                        label="Username"
                        id="inputLoginUsername"
                        name="username" />
                    <TextField
                        label="Password"
                        id="inputLoginPassword"
                        name="password" />
                    <div>
                        <Button id="loginSubmit" type="submit">Login</Button>
                    </div>
                </form>
            </Togglable>
        </Container>
    )
}

export default LogIn