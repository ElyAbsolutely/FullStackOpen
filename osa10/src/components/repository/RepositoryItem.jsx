import { View, StyleSheet, Image } from "react-native"

import CoolioText from "../fancyfier/CoolioText"
import theme from "../fancyfier/theme"

const inK = (unit) => {
    if (unit < 1000)
        return unit

    return (unit / 1000).toFixed(1) + "K"
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 10
    },
    box: {
        display: "flex",
        flexDirection: "row",
        padding: 5
    },
    boxClean: {
        display: "flex",
        flexDirection: "row"
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 10
    },
    text: {
        paddingLeft: 5,
        flex: 1
    },
    language: {
        backgroundColor: theme.colors.main,
        borderRadius: 6,
        padding: 4,
        paddingLeft: 6,
        paddingRight: 6
    },
    counter: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        paddingTop: 5
    },
    padding: {
        paddingTop: 2,
        paddingBottom: 5
    }
})

const RepositoryItem = ({ item }) => {

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Image style={styles.logo} source={{ uri: item.ownerAvatarUrl }} />
                <View style={styles.text}>
                    <CoolioText big>{item.fullName}</CoolioText>
                    <View style={styles.padding}>
                        <CoolioText desc>{item.description}</CoolioText>
                    </View>
                    <View style={styles.boxClean}>
                        <View style={styles.language}>
                            <CoolioText whiteOut>{item.language}</CoolioText>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.counter}>
                <View>
                    <CoolioText center desc>Stars</CoolioText>
                    <CoolioText center big>{inK(item.stargazersCount)}</CoolioText>
                </View>
                <View>
                    <CoolioText center desc>Forks</CoolioText>
                    <CoolioText center big>{inK(item.forksCount)}</CoolioText>
                </View>
                <View>
                    <CoolioText center desc>Reviews</CoolioText>
                    <CoolioText center big>{inK(item.reviewCount)}</CoolioText>
                </View>
                <View>
                    <CoolioText center desc>Ratings</CoolioText>
                    <CoolioText center big>{inK(item.ratingAverage)}</CoolioText>
                </View>
            </View>
        </View >
    )
}

export default RepositoryItem