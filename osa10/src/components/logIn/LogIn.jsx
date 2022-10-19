import { View, Pressable, StyleSheet } from "react-native"
import * as yup from "yup"
import { Formik } from "formik"
import { useApolloClient } from "@apollo/client"
import { useNavigate } from "react-router-native"

import CoolioText from "../fancyfier/CoolioText"
import FormikTextInput from "../input/FormikTextInput"
import theme from "../fancyfier/theme"
import useLogIn from "../../hooks/useLogIn"
import useAuthStorage from "../../hooks/useAuthStorage"

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
})

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(2, "Username must be greater or equal to 2")
        .required("Username is required"),
    password: yup
        .string()
        .min(3, "Password must be greater or equal to 3")
        .required("Password is required")
})

const LogIn = () => {
    const [logIn] = useLogIn()
    const authStorage = useAuthStorage()
    const apolloClient = useApolloClient()
    const navigate = useNavigate()

    const submit = async (values) => {
        const { username, password } = values

        try {
            const data = await logIn({ username, password })
            await authStorage.setAccessToken(data.authenticate.accessToken)
            console.log(data.authenticate.accessToken)
            await apolloClient.resetStore()
            navigate("/list")
        } catch (e) {
            console.log(e)
        }
    }

    const initialValues = {
        username: "kalle",
        password: "password"
    }

    return (
        <View style={styles.container}>
            <CoolioText big>Log In</CoolioText>
            <Formik
                initialValues={initialValues}
                onSubmit={submit}
                validationSchema={validationSchema}>
                {({ handleSubmit }) => <Form onSubmit={handleSubmit} />}
            </Formik>
        </View>
    )
}

const Form = ({ onSubmit }) => (
    <View>
        <FormikTextInput name="username" placeholder="Username" />
        <FormikTextInput name="password" placeholder="Password" />
        <Pressable onPress={onSubmit} style={styles.button}>
            <CoolioText whiteOut center>Log In</CoolioText>
        </Pressable>
    </View>
)

export default LogIn