import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const addNew = async (item) => {
    const response = await axios.post(baseUrl, item)
    return response.data
}

const vote = async (item) => {
    const response = await axios.put(baseUrl + "/" + item.id, item)
    return response.data
}

const anecdoteService = { getAll, addNew, vote }

export default anecdoteService