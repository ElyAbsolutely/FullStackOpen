const initialBlogs = [
    {
        title: "HTML is easy",
        author: "W3 Schools",
        url: "lolno",
        likes: 13
    },
    {
        title: "HTML is hard",
        author: "JM",
        url: "yes",
        likes: 902156
    }
]

const newBlog = {
    title: "Test",
    author: "Tester",
    url: "www.test.com",
    likes: 7357
}

const likelessBlog = {
    title: "Give likes plez",
    author: "Unnamed",
    url: "aaa.a.aaa/a"
}

const authorOnlyBlog = {
    author: "David"
}

const likesOnlyBlog = {
    likes: 9999
}

const newUser = {
    username: "Adam",
    name: "Adam",
    password: "Adam"
}

const newUserLogin = {
    username: "Adam",
    password: "Adam"
}

const sameUser = {
    username: "Mister man",
    name: "Not the man",
    password: "salainen",
}

module.exports = {
    initialBlogs, newBlog, likelessBlog, authorOnlyBlog, likesOnlyBlog, newUser, newUserLogin, sameUser
}