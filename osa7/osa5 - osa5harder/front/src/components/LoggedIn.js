import { useSelector, useDispatch } from "react-redux"
import { Container, Button } from "@mui/material"

import { logOut } from "../reducers/loggedReducer"

const LoggedIn = () => {
    const dispatch = useDispatch()

    const user = useSelector(({ logs }) => {
        return logs
    })

    return (
        <Container>
            <p>Logged in as {user.name}</p>
            <Button onClick={() => dispatch(logOut())}>Logout</Button>
        </Container>
    )
}

export default LoggedIn