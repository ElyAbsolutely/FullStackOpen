import { StyleSheet, View } from "react-native"
import { Route, Routes, Navigate } from "react-router-native"

import RepositoryList from "../repository/RepositoryList"
import RepositorySingle from "../repository/RepositorySingle"
import AppBar from "./AppBar"
import Front from "./Front"
import theme from "../fancyfier/theme"
import LogIn from "../logIn/LogIn"
import LogOut from "../logIn/LogOut"
import Reviewer from "../repository/Reviewer"
import SignUp from "../logIn/SignUp"
import MyReviews from "../logIn/MyReviews"


const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        flexGrow: 1,
        flexShrink: 1
    }
})

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path="/" element={<Front />} exact />
                <Route path="/list" element={<RepositoryList />} exact />
                <Route path="/list/:id" element={<RepositorySingle />} exact />
                <Route path="/login" element={<LogIn />} exact />
                <Route path="/logout" element={<LogOut />} exact />
                <Route path="/signup" element={<SignUp />} exact />
                <Route path="/reviewer" element={<Reviewer />} exact />
                <Route path="/myreviews" element={<MyReviews />} exact />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </View>
    )
}

export default Main