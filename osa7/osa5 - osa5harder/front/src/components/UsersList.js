import { Container, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material"

const UsersList = (props) => (
    <Container>
        <h2>Users</h2>
        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell><b>User</b></TableCell>
                        <TableCell><b>Blogs created</b></TableCell>
                    </TableRow>
                    {props.users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell><props.Link to={"/users/" + user.id}>{user.username}</props.Link></TableCell>
                            <TableCell>{user.blogs.length}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
)

export default UsersList