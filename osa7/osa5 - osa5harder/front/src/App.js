import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from "react-router-dom"
import { Container, AppBar, Toolbar, Button, IconButton, Divider } from "@mui/material"

import BlogsList from "./components/BlogsList"
import Blog from "./components/Blog"
import CreateBlog from "./components/CreateBlog"
import Notification from "./components/Notification"
import LogIn from "./components/LogIn"
import LoggedIn from "./components/LoggedIn"
import UsersList from "./components/UsersList"
import User from "./components/User"

import { setUser } from "./reducers/loggedReducer"
import { initializeBlogs } from "./reducers/blogReducer"
import { initializeUsers } from "./reducers/userReducer"

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUsers())
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("activeBlogAppUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser({ name: user.name, username: user.username, token: user.token }))
        }
    }, [dispatch])

    const user = useSelector(({ logs }) => { return logs })
    const users = useSelector(({ users }) => { return users })
    const blogs = useSelector(({ blogs }) => { return blogs })

    return (
        <Container>
            <Router>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                        </IconButton>
                        <Button color="inherit" component={Link} to="/">
                            Home
                        </Button>
                        <Button color="inherit" component={Link} to="/blogs">
                            Blogs
                        </Button>
                        <Button color="inherit" component={Link} to="/users">
                            Users
                        </Button>
                    </Toolbar>
                </AppBar>
                <Notification />
                {user.logged === false ? (
                    <LogIn />
                ) : (
                    <div>
                        <LoggedIn />
                        <CreateBlog />
                    </div>
                )}

                <h1>Blogs app</h1><Divider />

                <Routes>
                    <Route path="/" element={<p>A blog (a truncation of &quot;weblog&quot;) is a discussion or informational website published on the World Wide Web consisting of discrete, often informal diary-style text entries (posts). Posts are typically displayed in reverse chronological order, so that the most recent post appears first, at the top of the web page. Until 2009, blogs were usually the work of a single individual, occasionally of a small group, and often covered a single subject or topic. In the 2010s, &quot;multi-author blogs&quot; (MABs) emerged, featuring the writing of multiple authors and sometimes professionally edited. MABs from newspapers, other media outlets, universities, think tanks, advocacy groups, and similar institutions account for an increasing quantity of blog traffic. The rise of Twitter and other &quot;microblogging&quot; systems helps integrate MABs and single-author blogs into the news media. Blog can also be used as a verb, meaning to maintain or add content to a blog.</p>} />
                    <Route path="/blogs" element={<BlogsList blogs={blogs} Link={Link} />} />
                    <Route path="/blogs/:id" element={<Blog blogs={blogs} useParams={useParams} Link={Link} useNavigate={useNavigate} />} />
                    <Route path="/users" element={<UsersList users={users} Link={Link} />} />
                    <Route path="/users/:id" element={<User users={users} useParams={useParams} />} />
                </Routes>
            </Router >
        </Container>
    )
}

export default App