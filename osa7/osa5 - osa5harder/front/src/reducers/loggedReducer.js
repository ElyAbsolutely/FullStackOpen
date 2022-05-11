import httpServices from "../services/loginAndBlogs"

const loggedReducer = (state = { name: null, username: null, logged: false }, action) => {
    switch (action.type) {
    case "LOGIN_USER":
        return (state = { name: action.name, username: action.username, logged: true })
    case "LOGOUT_USER":
        return (state = { name: null, username: null, logged: false })
    default:
        return state
    }
}

export const setUser = (log) => {
    return async (dispatch) => {
        httpServices.setToken(log.token)

        await dispatch({
            type: "LOGIN_USER",
            name: log.name,
            username: log.username,
        })
    }
}

export const logIn = (log) => {
    return async (dispatch) => {
        const returnedUser = await httpServices.logIn(log)

        window.localStorage.setItem(
            "activeBlogAppUser",
            JSON.stringify(returnedUser)
        )

        httpServices.setToken(returnedUser.token)

        await dispatch({
            type: "LOGIN_USER",
            name: log.name,
            username: log.username,
        })
    }
}

export const logOut = () => {
    return async (dispatch) => {
        httpServices.setToken(null)
        window.localStorage.removeItem("activeBlogAppUser")

        await dispatch({
            type: "LOGOUT_USER",
        })
    }
}

export default loggedReducer