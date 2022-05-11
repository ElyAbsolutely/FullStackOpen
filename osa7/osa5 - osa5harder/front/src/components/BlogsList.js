import { Container, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material"

const BlogsList = (props) => (
    <Container>
        <h2>Blogs</h2>
        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    <TableRow>
                        <b>
                            <TableCell><b>Blog</b></TableCell>
                            <TableCell><b>Created by</b></TableCell>
                        </b>
                    </TableRow>
                    {props.blogs.map((blog) => (
                        <TableRow key={blog.id}>
                            <TableCell><props.Link to={"/blogs/" + blog.id}>{blog.title}</props.Link></TableCell>
                            <TableCell>{blog.user.username}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
)

export default BlogsList