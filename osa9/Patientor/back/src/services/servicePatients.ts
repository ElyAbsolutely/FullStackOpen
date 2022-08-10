import { v1 as uuid } from "uuid";

import data from "../data/patients";
import { Entry, Patient, PatientNew, PatientNoSSN, PatientPublic } from "../types";

const patients: Array<Patient> = data;

const getSpecificPatient = (id: string): Patient | null => {
    for (let x = 0; x < patients.length; x++)
        if (patients[x].id === id)
            return data[x];

    return null;
};

const getPatientsNoSSN = (): PatientNoSSN[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const getPatientsPublic = (): PatientPublic[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (entry: PatientNew): Patient => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

const addEntrytoPatient = (id: string, entry: Entry) => {
    for (let x = 0; x < patients.length; x++)
        if (patients[x].id === id) {
            patients[x].entries.push(entry);
            return patients[x];
        }

    return null;
};

export default {
    getSpecificPatient,
    getPatientsNoSSN,
    getPatientsPublic,
    addPatient,
    addEntrytoPatient 
};