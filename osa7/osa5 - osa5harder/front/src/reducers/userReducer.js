import { createSlice } from "@reduxjs/toolkit"
import httpServices from "../services/loginAndBlogs"

const userSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        addAll(state, action) {
            return action.payload.sort(function (a, b) { return b.likes - a.likes })
        },
    }
})

export const { addAll } = userSlice.actions

export const initializeUsers = () => {
    return async dispatch => {
        const returnedUsers = await httpServices.getAll("users")

        console.log("Returned users:", returnedUsers)

        dispatch(addAll(returnedUsers))
    }
}

export default userSlice.reducer