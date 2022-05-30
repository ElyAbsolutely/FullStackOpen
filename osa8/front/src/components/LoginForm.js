import { useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"

const LoginForm = ({ setToken, setErrorMessage, show, setPage }) => {
    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error)
            setErrorMessage(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if (result.data) {
            console.log(result.data)
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem("phonenumbers-user-token", token)
        }
    }, [result.data]) // eslint-disable-line

    const submit = async (event) => {
        event.preventDefault()

        login({ variables: { username: event.target.inputUsername.value, password: event.target.inputPassword.value } })

        setPage("authors")
    }

    if (!show)
        return null

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={submit}>
                <div>
                    Username <input name="inputUsername" />
                </div>
                <div>
                    Password <input name="inputPassword" />
                </div>
                <button type="submit">Log in</button>
            </form>
        </div>
    )
}

export default LoginForm