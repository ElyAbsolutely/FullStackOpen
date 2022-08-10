import { Field, Formik, Form } from "formik";
import { Grid, Button, Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import { HealthCheckEntry } from "../../types";
import { useStateValue } from "../../state";
import { TextField, NumberField } from "../../AddPatientModal/FormField";
import { DiagnosisSelection } from "../../AddPatientModal/FormField";
import { isDate } from "../../utils";

type HealthEntryNew = Omit<HealthCheckEntry, "id" | "type">;

interface ModalProps {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: HealthEntryNew) => void;
    error?: string;
}

const HealthEntryModal = ({ modalOpen, onClose, onSubmit, error }: ModalProps) => (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
        <DialogTitle>Add a Health check-Entry</DialogTitle>
        <Divider />
        <DialogContent>
            {error && <Alert severity="error">{"Error: " + error}</Alert>}
            <EntryForm onSubmit={onSubmit} onCancel={onClose} />
        </DialogContent>
    </Dialog>
);

interface FormProps {
    onSubmit: (values: HealthEntryNew) => void;
    onCancel: () => void;
}

const EntryForm = ({ onSubmit, onCancel }: FormProps) => {
    const [{ diagnosis }] = useStateValue();

    return (
        <Formik
            initialValues={{
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [],
                healthCheckRating: -1,
            }}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = "Field is required";
                const dateError = "Incorrectly typed date";
                const errors: { [field: string]: string } = {};
                if (!values.description)
                    errors.name = requiredError;

                if (!values.date)
                    errors.date = requiredError;

                if (isDate(values.date))
                    errors.date = dateError;

                if (!values.specialist)
                    errors.specialist = requiredError;

                if (values.healthCheckRating === -1)
                    errors.healthCheckRating = requiredError;

                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                            diagnoses={Object.values(diagnosis)}
                        />
                        <Field
                            label="Health Check Rating (0 [Healthy] - 3 [Critical])"
                            name="healthCheckRating"
                            min={-1} max={3}
                            component={NumberField}
                        />
                        <Grid>
                            <Grid item>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    style={{ float: "left" }}
                                    type="button"
                                    onClick={onCancel}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    style={{
                                        float: "right",
                                    }}
                                    type="submit"
                                    variant="contained"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default HealthEntryModal;