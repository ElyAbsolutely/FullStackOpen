import { StyleSheet } from "react-native"
import { useField } from "formik"

import TextInput from "./TextInput"
import CoolioText from "../fancyfier/CoolioText"

const styles = StyleSheet.create({
})

const FormikTextInput = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name)
    const showError = meta.touched && meta.error

    return (
        <>
            <TextInput
                onChangeText={value => helpers.setValue(value)}
                onBlur={() => helpers.setTouched(true)}
                value={field.value}
                error={showError}
                {...props}
            />
            {showError && <CoolioText error>{meta.error}</CoolioText>}
        </>
    )
}

export default FormikTextInput