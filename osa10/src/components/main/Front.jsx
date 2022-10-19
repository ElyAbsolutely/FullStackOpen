import { View, StyleSheet, Platform } from "react-native"

import CoolioText from "../fancyfier/CoolioText"

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 10
    },
    extra: {
        backgroundColor: "white",
        paddingTop: 20
    }
})

const Front = () => (
    <View style={styles.container}>
        <CoolioText>Open up App.js to start working on your app!</CoolioText>
        <CoolioText big>Open up App.js to start working on your app!</CoolioText>
        <CoolioText desc>Open up App.js to start working on your app!</CoolioText>
        <CoolioText whiteOut>I pointlessly exist on this page to annoy you with the extra open space</CoolioText>
        <CoolioText center>Open up App.js to start working on your app!</CoolioText>
        <View style={styles.extra}>
            <CoolioText fuschia>Your platform is: {Platform.OS}</CoolioText>
        </View>
    </View>

)

export default Front