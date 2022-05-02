import axios from "axios"

const getAll = () => {
    const request = axios.get("/api/blogs")
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

const updateLikes = async blogAndId => {
    const response = await axios.put("/api/blogs/" + blogAndId[1], blogAndId[0])
    return response.data
}

const httpServices = {
    getAll, setToken, create, logIn, token, updateLikes, deleteBlog
}

export default httpServices