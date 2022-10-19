import { View, Pressable, StyleSheet } from "react-native"
import * as yup from "yup"
import { Formik } from "formik"
import { useNavigate } from "react-router-native"
import { useApolloClient } from "@apollo/client"

import CoolioText from "../fancyfier/CoolioText"
import FormikTextInput from "../input/FormikTextInput"
import theme from "../fancyfier/theme"
import useCreateReview from "../../hooks/useCreateReview"

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
    ownerName: yup
        .string()
        .required("Owner´s name is required"),
    repositoryName: yup
        .string()
        .required("Repository´s name is required"),
    rating: yup
        .number()
        .min(0, "The rating must be no lesser than 0")
        .max(100, "The rating must be no greater than 100")
        .required("Rating is required"),
    text: yup
        .string()
})

const Reviewer = () => {
    const navigate = useNavigate()
    const apolloClient = useApolloClient()
    const [createReview] = useCreateReview()

    const submit = async (values) => {
        const { ownerName, repositoryName, rating, text } = values

        try {
            await createReview({ ownerName, repositoryName, rating, text })
            await apolloClient.resetStore()
            navigate("/list/" + ownerName + "." + repositoryName)
        } catch (e) {
            console.log(e)
        }
    }

    const initialValues = {
        ownerName: "jaredpalmer",
        repositoryName: "formik",
        rating: 99,
        text: "xd"
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
        <FormikTextInput name="ownerName" placeholder="Repository´s owner´s name" />
        <FormikTextInput name="repositoryName" placeholder="Repository´s name" />
        <FormikTextInput name="rating" placeholder="Rating between 0 - 100" />
        <FormikTextInput name="text" placeholder="Thoughts?" />
        <Pressable onPress={onSubmit} style={styles.button}>
            <CoolioText whiteOut center>Post review</CoolioText>
        </Pressable>
    </View>
)

export default Reviewer