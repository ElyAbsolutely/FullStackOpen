import { View, Pressable, StyleSheet } from "react-native"
import * as yup from "yup"
import { Formik } from "formik"
import { useNavigate } from "react-router-native"
import { useApolloClient } from "@apollo/client"

import CoolioText from "../fancyfier/CoolioText"
import FormikTextInput from "../input/FormikTextInput"
import theme from "../fancyfier/theme"
import useCreateUser from "../../hooks/useCreateUser"
import useAuthStorage from "../../hooks/useAuthStorage"
import useLogIn from "../../hooks/useLogIn"

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 10
    },
    button: {
        borderColor: theme.colors.background,
        borderWidth: 1,
        borderRadius: 5,
        width: "35%",
        margin: 5,
        padding: 10,
        backgroundColor: theme.colors.main
    }
})

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(1, "Username is too short, minimum 1 letter(s)")
        .max(30, "Username cannot be longer than 30")
        .required("Username is required"),
    password: yup
        .string()
        .min(5, "Password is too short, minimum 5 letters")
        .max(50, "Password cannot be longer than 50")
        .required("Password is required"),
    redo: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords do not match")
        .required("Confirm your password")
})

const SignUp = () => {
    const navigate = useNavigate()
    const authStorage = useAuthStorage()
    const apolloClient = useApolloClient()
    const [createUser] = useCreateUser()
    const [logIn] = useLogIn()

    const submit = async (values) => {
        const { username, password } = values

        try {
            await createUser({ username, password })

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
        username: "Jared Palmer",
        password: "password",
        redo: "password"
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
        <FormikTextInput name="username" placeholder="Your username" />
        <FormikTextInput name="password" placeholder="Your password" />
        <FormikTextInput name="redo" placeholder="Re-do password" />
        <Pressable onPress={onSubmit} style={styles.button}>
            <CoolioText whiteOut center>Sign up</CoolioText>
        </Pressable>
    </View>
)

export default SignUp