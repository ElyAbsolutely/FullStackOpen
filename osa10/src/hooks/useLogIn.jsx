import { useMutation } from "@apollo/client"

import { LOGIN } from "../graphql/mutations"

const useLogIn = () => {
    const [mutate, result] = useMutation(LOGIN)

    const logIn = async ({ username, password }) => {
        const credentials = { username, password }
        const { data } = await mutate({ variables: { credentials } })
        return data
    }

    return [logIn, result]
}

export default useLogIn