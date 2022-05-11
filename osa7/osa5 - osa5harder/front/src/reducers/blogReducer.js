import { createSlice } from "@reduxjs/toolkit"
import httpServices from "../services/loginAndBlogs"

const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        vote(state, action) {
            return state.map(b =>
                (b.id === action.payload.id) ? action.payload : b)
                .sort(function (a, b) { return b.likes - a.likes })
        },
        addSingle(state, action) {
            state.push(action.payload)
        },
        addAll(state, action) {
            return action.payload
                .sort(function (a, b) { return b.likes - a.likes })
        },
        deleteSingle(state, action) {
            return state
                .filter(function (blog) { return blog.id !== action.payload })
        },
        replace(state, action) {
            const blog = state.find((b) => b.id === action.payload[0])
            action.payload[1].user = blog.user
            return state.map((b) => (b.id !== action.payload[0] ? b : action.payload[1]))
        }
    }
})

export const { vote, addSingle, addAll, deleteSingle, replace } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const returnedBlogs = await httpServices.getAll("blogs")

        console.log("Returned blogs:", returnedBlogs)

        dispatch(addAll(returnedBlogs))
    }
}

export const postBlog = (item, user) => {
    return async dispatch => {
        const returnedBlog = await httpServices.create(item)
        console.log("return", returnedBlog)
        console.log("user", user)
        const newUser = { username: user.username, id: returnedBlog.user }
        returnedBlog.user = newUser
        dispatch(addSingle(returnedBlog))
    }
}

export const voteBlog = (id, item, user) => {
    const newItem = {
        ...item,
        likes: item.likes + 1
    }

    return async dispatch => {
        const returnedBlog = await httpServices.updateLikes(id, newItem)

        returnedBlog.user = user

        dispatch(vote(returnedBlog))
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await httpServices.deleteBlog(id)
        dispatch(deleteSingle(id))
    }
}

export const postComment = (id, comment) => {
    return async dispatch => {
        const returnedBlog = await httpServices.postComment(id, comment)
        console.log(returnedBlog)
        dispatch(replace([id, returnedBlog]))
    }
}

export default blogSlice.reducer