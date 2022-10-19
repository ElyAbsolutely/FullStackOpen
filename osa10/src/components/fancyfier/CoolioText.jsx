import { Text, StyleSheet, Platform } from "react-native";
import theme from "./theme";

export const getFont = () => {
    switch (Platform.OS) {
        case "android":
            return "Roboto"
        case "ios":
            return "Arial"
        default:
            return "System"
    }
}

const styles = StyleSheet.create({
    text: {
        color: "black",
        fontSize: 16,
        fontWeight: "400",
        fontFamily: getFont()
    },
    big: {
        fontSize: 20,
        fontWeight: "700"
    },
    desc: {
        color: "gray"
    },
    whiteOut: {
        color: "white"
    },
    center: {
        textAlign: "center"
    },
    theme: {
        color: theme.colors.main
    },
    error: {
        color: theme.colors.error
    },
    fuschia: {
        color: theme.colors.fuschiaIsNow
    }
});

const CoolioText = ({ big, desc, whiteOut, center, theme, error, fuschia, children }) => {

    const textStyles = [
        styles.text,
        big && styles.big,
        desc && styles.desc,
        whiteOut && styles.whiteOut,
        center && styles.center,
        theme && styles.theme,
        error && styles.error,
        fuschia && styles.fuschia
    ];

    return <Text style={textStyles}>{children}</Text>;
};

export default CoolioText;