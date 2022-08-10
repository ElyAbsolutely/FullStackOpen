/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PatientNew, Gender } from "../types";

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name))
        throw new Error("Incorrect or missing name");
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date))
        throw new Error("Incorrect or missing date: " + date);
    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender))
        throw new Error("Incorrect or missing gender: " + gender);
    return gender;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn))
        throw new Error("Incorrect or missing ssn");
    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation))
        throw new Error("Incorrect or missing occupation");
    return occupation;
};

const parseEntries = (entries: unknown): any[] => {
    if (!entries || !Array.isArray(entries))
        throw new Error("Incorrect or missing entry");
    return entries;
};

//type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries }: any): PatientNew => {
    const newEntry: PatientNew = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: parseEntries(entries)
    };

    return newEntry;
};

export default toNewPatient;