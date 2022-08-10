import React from "react";
import axios from "axios";
import { Container, Divider, Box, Button } from "@material-ui/core";

import { Diagnosis, FullPatient, Entry, EntryNew, Gender } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, addPatientFull, setDiagnosisList, replacePatientInList } from "../state";
import EntryDetails from "./EntryDetails";
import HospitalEntryModal from "./Forms/EntryFormHospital";
import OccupationalEntryModal from "./Forms/EntryFormOccupational";
import HealthEntryModal from "./Forms/EntryFormHealthcheck";

import { Icon } from "@mui/material";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import TransgenderIcon from "@mui/icons-material/Transgender";



const Singularity: React.FC = () => {
    const url = window.location.href;
    const split = url.split("/").pop();
    if (typeof split === "undefined")
        return <div><br />Invalid URL</div>;
    const id = split.toString();

    const [{ patient, diagnosis }, dispatch] = useStateValue();

    const getPatient = async () => {
        try {
            const { data: fetchedPatient } = await axios.get<FullPatient>(
                apiBaseUrl + "/patients/" + id
            );
            dispatch(addPatientFull(fetchedPatient));
        } catch (e) {
            console.error(e);
        }
    };

    const getDiagnosis = async () => {
        try {
            const { data: diagnosisCodeList } = await axios.get<Diagnosis[]>(
                apiBaseUrl + "/diagnoses"
            );
            dispatch(setDiagnosisList(diagnosisCodeList));
        } catch (e) {
            console.error(e);
        }
    };

    if (!patient || patient?.id !== id)
        void getPatient();

    if (!diagnosis || diagnosis.length === 0)
        void getDiagnosis();

    if (!patient || patient?.id !== id)
        return (<div><b>Error 404: Couldn´t find patient</b></div>);

    let genderIcon = null;

    if (patient.gender === Gender.Female)
        genderIcon = WomanIcon;
    else if (patient.gender === Gender.Male)
        genderIcon = ManIcon;
    else
        genderIcon = TransgenderIcon;

    console.log(patient);
    console.log(diagnosis);

    const [modalOpen01, setModalOpen01] = React.useState<boolean>(false);
    const [modalOpen02, setModalOpen02] = React.useState<boolean>(false);
    const [modalOpen03, setModalOpen03] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();

    const openModal01 = (): void => setModalOpen01(true);
    const openModal02 = (): void => setModalOpen02(true);
    const openModal03 = (): void => setModalOpen03(true);

    const closeModal = (): void => {
        setModalOpen01(false);
        setModalOpen02(false);
        setModalOpen03(false);
        setError(undefined);
    };

    const submitNewPatient = async (values: EntryNew) => {
        try {
            const { data: newPatient } = await axios.post<FullPatient>(
                apiBaseUrl + "/patients/" + id + "/entries",
                values
            );
            dispatch(replacePatientInList(newPatient));
            dispatch(addPatientFull(newPatient));
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

    const boldHeadlineStyle = { fontSize: "20px" };

    return (
        <Container>
            <Box>
                <h2>Patient data:</h2>
            </Box>
            <Container>
                <p><b style={boldHeadlineStyle}>Name: </b>{patient.name}<Icon component={genderIcon} /></p>
                <p><b style={boldHeadlineStyle}>Occupation: </b>{patient.occupation}</p>
                <p><b style={boldHeadlineStyle}>SSN: </b>{patient.ssn}</p>
            </Container>
            <Box>
                <h2>Entries</h2>
                <HospitalEntryModal
                    modalOpen={modalOpen01}
                    onSubmit={submitNewPatient}
                    error={error}
                    onClose={closeModal} />
                <OccupationalEntryModal
                    modalOpen={modalOpen02}
                    onSubmit={submitNewPatient}
                    error={error}
                    onClose={closeModal} />
                <HealthEntryModal
                    modalOpen={modalOpen03}
                    onSubmit={submitNewPatient}
                    error={error}
                    onClose={closeModal} />
                <Button variant="contained" onClick={() => openModal01()}>
                    New Hospital-Entry
                </Button>
                <Button variant="contained" onClick={() => openModal02()}>
                    New Occupational-Entry
                </Button>
                <Button variant="contained" onClick={() => openModal03()}>
                    New Health Check-Entry
                </Button>
                {patient.entries.map((entry: Entry) => (
                    <EntryDetails key={entry.id} entry={entry} />
                ))}
                <Divider />
            </Box>

            <Box>
                <small>Patient ID: {patient.id}</small>
            </Box>
        </Container >
    );
};

export default Singularity;