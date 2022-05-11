const messageReducer = (state = { message: null, show: false }, action) => {
    switch (action.type) {
    case "SET_MESSAGE":
        return (state = { message: action.message, show: true })
    case "SET_BACK":
        return (state = { message: null, show: false })
    default:
        return state
    }
}

var timer

export const postmanPat = (message, newTimer) => {
    return async (dispatch) => {
        newTimer = newTimer * 1000

        await dispatch({
            type: "SET_MESSAGE",
            message,
        })

        clearTimeout(timer)

        timer = setTimeout(() => {
            dispatch({
                type: "SET_BACK",
            })
        }, newTimer)
    }
}

export default messageReducer