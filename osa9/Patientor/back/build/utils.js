"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const parseName = (name) => {
    if (!name || !isString(name))
        throw new Error("Incorrect or missing name");
    return name;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date))
        throw new Error("Incorrect or missing date: " + date);
    return date;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender))
        throw new Error("Incorrect or missing gender: " + gender);
    return gender;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn))
        throw new Error("Incorrect or missing ssn");
    return ssn;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation))
        throw new Error("Incorrect or missing occupation");
    return occupation;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseEntries = (entries) => {
    if (!entries || !Array.isArray(entries))
        throw new Error("Incorrect or missing entry");
    return entries;
};
const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries }) => {
    const newEntry = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        entries: parseEntries(entries)
    };
    return newEntry;
};
exports.default = toNewPatient;
