import { useDispatch } from "react-redux"
import { Container, TextField, Button, List, ListItem } from "@mui/material"

import { postComment } from "../reducers/blogReducer"

const BlogComments = (props) => {
    const dispatch = useDispatch()

    const action = (event) => {
        event.preventDefault()

        const input = event.target.commentInput.value
        event.target.commentInput.value = ""

        dispatch(postComment(props.blog.id, input))
    }

    return (
        <Container>
            <h4>Comments</h4>

            <form onSubmit={action}>
                <TextField label="Title" id="postBlogInputTitle" name="commentInput" />
                <Button type="submit">Post Comment</Button>
            </form>
            {props.blog.comments.length > 0 ? (
                <List>
                    {props.blog.comments.map((comment) => (
                        <ListItem key={comment}>{comment}</ListItem >
                    ))}
                </List>
            ) : (
                <p>No comments...</p>
            )}
        </Container>
    )
}

export default BlogComments