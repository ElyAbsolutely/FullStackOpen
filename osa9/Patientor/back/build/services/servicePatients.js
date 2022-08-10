"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../data/patients"));
const patients = patients_1.default;
const getSpecificPatient = (id) => {
    for (let x = 0; x < patients.length; x++)
        if (patients[x].id === id)
            return patients_1.default[x];
    return null;
};
const getPatientsNoSSN = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};
const getPatientsPublic = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addPatient = (entry) => {
    const newPatientEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patients.push(newPatientEntry);
    return newPatientEntry;
};
const addEntrytoPatient = (id, entry) => {
    for (let x = 0; x < patients.length; x++)
        if (patients[x].id === id) {
            patients[x].entries.push(entry);
            return patients[x];
        }
    return null;
};
exports.default = {
    getSpecificPatient,
    getPatientsNoSSN,
    getPatientsPublic,
    addPatient,
    addEntrytoPatient
};
