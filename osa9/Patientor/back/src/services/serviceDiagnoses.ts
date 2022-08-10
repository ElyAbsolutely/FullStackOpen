import data from "../data/diagnoses";
import { Diagnosis } from "../types";

const diagnoses: Array<Diagnosis> = data;

const getDiagnoses = (): Array<Diagnosis> => {
    return diagnoses;
};

export default {
    getDiagnoses
};