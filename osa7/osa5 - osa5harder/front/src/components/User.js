import { Container, List, ListItem, Divider } from "@mui/material"

const User = (props) => {
    const id = props.useParams().id
    const user = props.users.find(u => u.id === (id))

    return (
        <Container className="user">
            <h2>{user.username}</h2>
            <Divider />
            <h3>Blogs added -{user.blogs.length}</h3>
            <List>
                {user.blogs.map((blog) => (
                    <ListItem key={blog.id}>{blog.title}</ListItem>
                ))}
            </List>
            <Divider />
            <p><small>ID: {user.id}</small></p>
        </Container>
    )
}

export default User