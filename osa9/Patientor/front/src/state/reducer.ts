import { State } from "./state";
import { Patient, FullPatient, Diagnosis } from "../types";

export type Action =
    | {
        type: "SET_PATIENT_LIST";
        payload: Patient[];
    }
    | {
        type: "ADD_PATIENT";
        payload: Patient;
    }
    | {
        type: "ADD_PATIENT_SINGLE";
        payload: FullPatient;
    }
    | {
        type: "SET_DIAGNOSIS_LIST";
        payload: Diagnosis[];
    }
    | {
        type: "REPLACE_PATIENT";
        payload: Patient;
    };

export const setPatientList = (patientList: Patient[]): Action => {
    return {
        type: "SET_PATIENT_LIST",
        payload: patientList,
    };
};

export const addPatientToList = (patient: Patient): Action => {
    return {
        type: "ADD_PATIENT",
        payload: patient,
    };
};

export const addPatientFull = (patient: FullPatient): Action => {
    return {
        type: "ADD_PATIENT_SINGLE",
        payload: patient,
    };
};

export const setDiagnosisList = (diagnosisList: Diagnosis[]): Action => {
    return {
        type: "SET_DIAGNOSIS_LIST",
        payload: diagnosisList,
    };
};

export const replacePatientInList = (patientWithNewEntry: Patient): Action => {
    return {
        type: "REPLACE_PATIENT",
        payload: patientWithNewEntry
    };
};


export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_PATIENT_LIST":
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({ ...memo, [patient.id]: patient }),
                        {}
                    ),
                    ...state.patients
                }
            };
        case "ADD_PATIENT":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload
                }
            };
        case "ADD_PATIENT_SINGLE":
            return {
                ...state,
                patient: action.payload
            };
        case "SET_DIAGNOSIS_LIST":
            return {
                ...state,
                diagnosis: action.payload
            };
        case "REPLACE_PATIENT":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: {
                        ...state.patients[action.payload.id],
                        ...action.payload,
                    },
                },
            };
        default:
            return state;
    }
};
