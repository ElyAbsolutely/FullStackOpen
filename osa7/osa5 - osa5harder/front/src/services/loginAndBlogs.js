import axios from "axios"

const getAll = (url) => {
    const request = axios.get("/api/" + url)
    return request.then(response => response.data)
}

let token = null

const setToken = newToken => {
    token = "bearer " + newToken
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post("/api/blogs", newObject, config)
    return response.data
}

const deleteBlog = async id => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.delete("/api/blogs/" + id, config)
    return response.data
}

const logIn = async loginRequest => {
    const response = await axios.post("/api/login", loginRequest)
    return response.data
}

const updateLikes = async (id, blog) => {
    const response = await axios.put("/api/blogs/" + id, blog)
    return response.data
}

const postComment = async (id, comment) => {
    const response = await axios.post("/api/blogs/" + id + "/comments", { comment })
    return response.data
}

const httpServices = {
    getAll, setToken, create, logIn, token, updateLikes, deleteBlog, postComment
}

export default httpServices