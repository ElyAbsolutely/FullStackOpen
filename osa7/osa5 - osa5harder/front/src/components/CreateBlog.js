import { useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Container, TextField, Button, List, ListItem } from "@mui/material"

import Togglable from "./Togglable"

import { postmanPat } from "../reducers/messageReducer"
import { postBlog } from "../reducers/blogReducer"

const CreateBlog = () => {
    const dispatch = useDispatch()

    const user = useSelector(({ logs }) => {
        return logs
    })

    const blogForm = (event) => {
        event.preventDefault()

        const blogTitle = event.target.blogTitle.value
        const blogAuthor = event.target.blogAuthor.value
        const blogUrl = event.target.blogUrl.value
        const blogLikes = event.target.blogLikes.value

        var blogObject

        if (blogLikes === "")
            blogObject = {
                title: blogTitle,
                author: blogAuthor,
                url: blogUrl,
                likes: undefined
            }
        else
            blogObject = {
                title: blogTitle,
                author: blogAuthor,
                url: blogUrl,
                likes: blogLikes
            }

        event.target.blogTitle.value = ""
        event.target.blogAuthor.value = ""
        event.target.blogUrl.value = ""
        event.target.blogLikes.value = ""

        try {
            blogFormRef.current.toggleVisibility()

            dispatch(postBlog(blogObject, user))
            dispatch(postmanPat("New blog: " + blogObject.title + " by " + blogObject.author + " added", 4))
        } catch (e) {
            console.log(e)
            dispatch(postmanPat("Something went wrong", 4))
        }
    }

    const blogFormRef = useRef()

    return (
        <div>
            <Togglable buttonLabel="Post a Blog" ref={blogFormRef}>
                <Container>
                    <h2>Post a new blog</h2>
                    <form onSubmit={blogForm}>
                        <List>
                            <ListItem>
                                <TextField
                                    label="Title"
                                    id="postBlogInputTitle"
                                    name="blogTitle" />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    label="Author"
                                    id="postBlogInputAuthor"
                                    name="blogAuthor" />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    label="Url"
                                    id="postBlogInputUrl"
                                    name="blogUrl" />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    label="Likes"
                                    id="postBlogInputLikes"
                                    type="number"
                                    name="blogLikes" />
                            </ListItem>
                        </List>
                        <div>
                            <Button id="postBlogSubmit" type="submit">Post</Button>
                        </div>
                    </form>
                </Container>
            </Togglable>
        </div >
    )
}

export default CreateBlog