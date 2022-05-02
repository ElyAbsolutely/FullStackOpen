const filterReducer = (state = { filter: null }, action) => {
    switch (action.type) {
        case "SET_FILTER":
            return state = { filter: action.filter }
        case "UNSET_FILTER":
            return state = { filter: null }
        default:
            return state
    }
}

export const setFilter = filter => {
    return {
        type: "SET_FILTER",
        filter,
    }
}

export const unsetFilter = () => {
    return {
        type: "UNSET_FILTER",
    }
}

export default filterReducer