import { View, Pressable, StyleSheet } from "react-native"
import { useApolloClient } from "@apollo/client"
import { useNavigate } from "react-router-native"

import CoolioText from "../fancyfier/CoolioText"
import useAuthStorage from "../../hooks/useAuthStorage"
import theme from "../fancyfier/theme"

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 10
    },
    button: {
        borderColor: theme.colors.background,
        borderWidth: 1,
        borderRadius: 5,
        width: "25%",
        margin: 5,
        padding: 10,
        backgroundColor: theme.colors.main
    }
});

const LogOut = () => {
    const authStorage = useAuthStorage()
    const apolloClient = useApolloClient()
    const navigate = useNavigate()

    const logout = async () => {
        try {
            await authStorage.removeAccessToken()
            await apolloClient.resetStore()
            navigate("/list")
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            <CoolioText big>You are logging out</CoolioText>
            <CoolioText desc>You will lose all unsaved progress if you log out. There is no way to retrieve any lost data. Think of you family and your loved ones. Don´t try to be a hero!</CoolioText>
            <Pressable onPress={logout} style={styles.button}><CoolioText whiteOut center>Log Out</CoolioText></Pressable>
        </View>
    )
}

export default LogOut