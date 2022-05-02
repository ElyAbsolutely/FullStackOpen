import React, { useState, useEffect, useRef } from "react"

import httpServices from "./services/blogs"

import Blog from "./components/Blog"
import CreateBlog from "./components/CreateBlog"
import Message from "./components/Message"
import LogIn from "./components/LogIn"
import LoggedIn from "./components/LoggedIn"
import Togglable from "./components/Togglable"

const App = () => {

    const [message, setMessage] = useState([0, null])

    const [activeUserName, setUserName] = useState(null)
    const [activeUserUsername, setUserUsername] = useState(null)
    const [isLogged, setLoggedState] = useState(false)

    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        httpServices.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    blogs.sort(function (a, b) { return b.likes - a.likes })

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("activeBlogAppUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUserName(user.name)
            setUserUsername(user.username)
            httpServices.setToken(user.token)
            setLoggedState(true)
        }
    }, [])

    const logIn = async (loginForm) => {

        try {
            const returnedUser = await httpServices.logIn(loginForm)

            window.localStorage.setItem(
                "activeBlogAppUser", JSON.stringify(returnedUser)
            )

            loginFormRef.current.toggleVisibility()

            setUserName(returnedUser.name)
            setUserUsername(returnedUser.username)
            httpServices.setToken(returnedUser.token)
            setLoggedState(true); console.log(returnedUser)

            setMessage([1, "Logged in as " + returnedUser.username])
            setTimeout(() => {
                setMessage([0, null])
            }, 3500)
        } catch (e) {
            console.log(e)
            setMessage([2, "Wrong username or password"])
            setTimeout(() => {
                setMessage([0, null])
            }, 3500)
        }
    }

    const logOut = () => {
        setUserName(null)
        setUserUsername(null)
        httpServices.setToken(null)
        setLoggedState(false)
        window.localStorage.removeItem("activeBlogAppUser")
    }

    const post = async (blogObject) => {

        try {
            const returnedBlog = await httpServices.create(blogObject)
            console.log(returnedBlog)

            const theUser = {
                username: activeUserUsername,
                id: returnedBlog.user
            }

            returnedBlog.user = theUser
            setBlogs(blogs.concat(returnedBlog))
            blogFormRef.current.toggleVisibility()

            setMessage([1, "New blog: " + returnedBlog.title + " by " + returnedBlog.author + " added"])
            setTimeout(() => {
                setMessage([0, null])
            }, 3500)
        } catch (e) {
            console.log(e)
            setMessage([2, "Something went wrong"])
            setTimeout(() => {
                setMessage([0, null])
            }, 3500)
        }
    }

    const likeThisPost = async (blogAndId) => {

        try {
            console.log(blogAndId, "eka")
            const returnedBlog = await httpServices.updateLikes(blogAndId)
            console.log(returnedBlog)
            const theUser = blogAndId[2]
            blogAndId[0].user = theUser
            blogAndId[0].id = blogAndId[1]
            console.log(blogAndId, "toka")
            setBlogs(blogs.map(b => b.id !== blogAndId[1] ? b : blogAndId[0]))
        } catch (e) {
            console.log(e)
            setMessage([2, "Something went wrong"])
            setTimeout(() => {
                setMessage([0, null])
            }, 3500)
        }
    }

    const deleteBlog = async (id) => {

        try {
            console.log(id, "eka")
            const returnedBlog = await httpServices.deleteBlog(id)
            console.log(returnedBlog)

            const blog = blogs.find(b => b.id === id)
            const thisBlog = {
                title: "deletedBlog101"
            }
            setBlogs(blogs.map(b => b.id !== blog.id ? b : thisBlog))

            setMessage([1, "Blog deleted"])
            setTimeout(() => {
                setMessage([0, null])
            }, 3500)
        } catch (e) {
            console.log(e)
            setMessage([2, "Something went wrong"])
            setTimeout(() => {
                setMessage([0, null])
            }, 3500)
        }
    }

    const loginFormRef = useRef()
    const blogFormRef = useRef()

    return (
        <div>
            <Message message={message}></Message>
            {isLogged === false ?
                <Togglable buttonLabel="Login as user" ref={loginFormRef}>
                    <LogIn action={logIn} />
                </Togglable>
                :
                <div>
                    <div>
                        <LoggedIn name={activeUserName} action={logOut} />
                    </div >
                    <div>
                        <Togglable buttonLabel="Post a Blog" ref={blogFormRef}>
                            <CreateBlog action={post} />
                        </Togglable>
                    </div >
                </div >
            }
            <div>
                <h2>blogs</h2>
                {blogs.map(blog =>
                    <Blog actionLike={likeThisPost} actionDelete={deleteBlog} activeUsername={activeUserUsername} key={blog.id} blog={blog} />)}
            </div>
        </div >
    )
}

export default App