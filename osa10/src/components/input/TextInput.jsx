import { TextInput as NativeTextInput, StyleSheet } from "react-native"

import theme from "../fancyfier/theme"

const styles = StyleSheet.create({
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    width: "80%",
    margin: 5,
    padding: 5
  },
  inputError: {
    borderColor: theme.colors.error,
    borderWidth: 1,
    borderRadius: 5,
    width: "80%",
    margin: 5,
    padding: 5
  }
})

const TextInput = ({ style, error, ...props }) => {

  let textInputStyle

  if (!error)
    textInputStyle = styles.input
  else
    textInputStyle = styles.inputError

  return <NativeTextInput style={textInputStyle} {...props} />
}

export default TextInput