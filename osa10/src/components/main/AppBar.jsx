import { View, StyleSheet, ScrollView } from "react-native"
import Constants from "expo-constants"
import { Link } from "react-router-native"
import { useQuery } from "@apollo/client"

import CoolioText from "../fancyfier/CoolioText"
import theme from "../fancyfier/theme"
import { GET_ME } from "../../graphql/queries"

const styles = StyleSheet.create({
    main: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.main
    },
    container: {
        display: "flex",
        flexDirection: "row",
        height: 50
    },
    button: {
        width: 130,
        padding: 10,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: "white"
    },
    bottom: {
        backgroundColor: theme.colors.background,
        height: 10
    },
    scrollView: {
        borderTopWidth: 2,
        borderColor: "white"
    }
})

const AppBar = () => {
    const { data, error, loading } = useQuery(GET_ME)

    let isLoggedIn = false

    if (data && data.me !== null)
        isLoggedIn = true

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <ScrollView horizontal style={styles.scrollView}>
                    <Link style={styles.button} to="/">
                        <CoolioText big center whiteOut>Front</CoolioText>
                    </Link>
                    <Link style={styles.button} to="/list">
                        <CoolioText big center whiteOut>List</CoolioText>
                    </Link>
                    <Link style={styles.button} to="/reviewer">
                        <CoolioText big center whiteOut>Reviewer</CoolioText>
                    </Link>
                    {isLoggedIn ?
                        <>
                            <Link style={styles.button} to="/myreviews">
                                <CoolioText big center whiteOut>My Reviews</CoolioText>
                            </Link>
                            <Link style={styles.button} to="/logout">
                                <CoolioText big center whiteOut>Log Out</CoolioText>
                            </Link>

                        </>
                        :
                        <>
                            <Link style={styles.button} to="/login">
                                <CoolioText big center whiteOut>Log In</CoolioText>
                            </Link>
                            <Link style={styles.button} to="/signup">
                                <CoolioText big center whiteOut>Sign Up</CoolioText>
                            </Link>
                        </>
                    }
                </ScrollView>
            </View>
            <View style={styles.bottom} />
        </View>
    )
}

export default AppBar