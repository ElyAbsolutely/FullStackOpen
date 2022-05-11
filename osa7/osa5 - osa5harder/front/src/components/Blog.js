import { useSelector, useDispatch } from "react-redux"
import { Container, Button, List, ListItem, Divider } from "@mui/material"

import { postmanPat } from "../reducers/messageReducer"
import { voteBlog, deleteBlog } from "../reducers/blogReducer"

import BlogComments from "./BlogComments"

const Blog = (props) => {
    const navigate = props.useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(({ logs }) => { return logs })

    const id = props.useParams().id
    const blog = props.blogs.find(u => u.id === (id))

    const likeBlog = (event) => {
        event.preventDefault()

        const item = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes
        }

        const user = blog.user

        try {
            dispatch(voteBlog(blog.id, item, user))
        } catch (e) {
            console.log(e)
            dispatch(postmanPat("Something went wrong", 4))
        }
    }

    const del = (event) => {
        event.preventDefault()

        if (user.username === blog.user.username) {
            if (window.confirm("Delete blog " + blog.title + "?"))
                try {
                    navigate("/blogs")
                    dispatch(deleteBlog(blog.id))
                    dispatch(postmanPat("Blog deleted", 4))
                } catch (e) {
                    console.log(e)
                    dispatch(postmanPat("Something went wrong", 4))
                }
        } else
            console.log("No access, en jaksa korjata mikä ikinä ongelma ilmesty poisto napin kaa")
    }

    return (
        <Container className="blog">
            <List>
                <ListItem>
                    <h3>{blog.title}</h3>
                </ListItem>
                <Divider />
                <ListItem>
                    By: {blog.author}
                </ListItem>
                <ListItem>
                    <props.Link to={blog.url}>{blog.url}</props.Link>
                </ListItem>
                <ListItem>
                    <p>Likes: {blog.likes}</p>
                    <Button onClick={likeBlog}>Like</Button></ListItem>
                <ListItem>
                    Posted by: {blog.user.username}
                </ListItem>
                <ListItem>
                    <small>ID: {blog.id}</small><Button onClick={del}>Delete</Button>
                </ListItem>
            </List>
            <Divider />
            <BlogComments blog={blog} />
        </Container>
    )
}

export default Blog