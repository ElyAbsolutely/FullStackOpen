import React from "react";
import axios from "axios";
import { Box, Table, Button, TableHead, Typography } from "@material-ui/core";

import { PatientFormValues } from "../AddPatientModal/AddPatientForm";
import AddPatientModal from "../AddPatientModal";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue, addPatientToList } from "../state";
import { TableCell, TableRow, TableBody } from "@material-ui/core";

const style = {
    border: "ridge",
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    color: "black",
    textDecoration: "none"
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PatientListPage = ({ Link }: any) => {
    const [{ patients }, dispatch] = useStateValue();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewPatient = async (values: PatientFormValues) => {
        try {
            const { data: newPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients`,
                values
            );
            dispatch(addPatientToList(newPatient));
            closeModal();
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                console.error(e?.response?.data || "Unrecognized axios error");
                setError(String(e?.response?.data?.error) || "Unrecognized axios error");
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    };

    return (
        <div className="App">
            <Box>
                <Typography align="center" variant="h6">
                    Patient list
                </Typography>
            </Box>
            <Table style={{ marginBottom: "1em" }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Occupation</TableCell>
                        <TableCell>Health Rating</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.values(patients).map((patient: Patient) => (
                        <TableRow key={patient.id}>
                            <TableCell>
                                <Link style={style} to={"/patient/" + patient.id}>
                                    {patient.name}
                                </Link>
                            </TableCell>
                            <TableCell>{patient.gender}</TableCell>
                            <TableCell>{patient.occupation}</TableCell>
                            <TableCell>
                                <HealthRatingBar showText={false} rating={1} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <AddPatientModal
                modalOpen={modalOpen}
                onSubmit={submitNewPatient}
                error={error}
                onClose={closeModal}
            />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Patient
            </Button>
        </div >
    );
};

export default PatientListPage;
