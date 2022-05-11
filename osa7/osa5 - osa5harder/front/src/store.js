import { configureStore } from "@reduxjs/toolkit"

import blogReducer from "./reducers/blogReducer"
import messageReducer from "./reducers/messageReducer"
import loggedReducer from "./reducers/loggedReducer"
import userReducer from "./reducers/userReducer"

const store = configureStore({
    reducer: {
        blogs: blogReducer,
        messages: messageReducer,
        logs: loggedReducer,
        users: userReducer
    },
})

export default store