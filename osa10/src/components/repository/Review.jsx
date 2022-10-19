import { View, StyleSheet } from "react-native"

import CoolioText from "../fancyfier/CoolioText"
import theme from "../fancyfier/theme"

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 10,
    },
    flexContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start"
    },
    flexContainerEven: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    score: {
        borderWidth: 2,
        borderColor: theme.colors.main,
        padding: 15,
        height: 60,
        width: 60,
        borderRadius: 30,
    },
    text: {
        padding: 10,
        flex: 1
    },
    buttonView: {
        padding: 10,
        backgroundColor: theme.colors.main
    },
    buttonDelete: {
        padding: 10,
        backgroundColor: theme.colors.error
    }
})

export const cutDate = (date) => {
    const year = date.slice(0, 4)
    const month = date.slice(5, 7)
    const day = date.slice(8, 10)
    const time = date.slice(14, 19)
    return day + "." + month + "." + year + " " + time
}

const Review = ({ item }) => {
    const date = cutDate(item.createdAt)

    return (
        < View style={styles.container} >
            <View style={styles.flexContainer}>
                <View style={styles.score}>
                    <CoolioText theme big center>{item.rating}</CoolioText>
                </View>
                <View style={styles.text}>
                    <CoolioText big>{item.user.username}</CoolioText>
                    <CoolioText desc>{date}</CoolioText>
                    <CoolioText>{item.text}</CoolioText>
                </View>
            </View>
        </View >
    )
}

export default Review