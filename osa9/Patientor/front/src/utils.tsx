import { Patient } from "./types";
import { Gender } from "./types";

export const setEmptyPatient = () => {
    const patient = {
        name: "",
        occupation: "",
        id: "",
        gender: Gender.Other,
        ssn: "",
        dateOfBirth: ""
    };
    return patient;
};

export const patientIsNull = (patient: Patient) => {
    console.log(patient);
    if (
        patient.name === ""
        || patient.occupation === ""
        || patient.dateOfBirth === ""
        || patient.id === ""
    )
        return true;
    return false;
};

export const isDate = (date: string): boolean => {
    return Boolean(!Date.parse(date));
};