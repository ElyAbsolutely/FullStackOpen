"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const parseDescription = (description) => {
    if (!description || !isString(description))
        throw new Error("Incorrect or missing description");
    return description;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date))
        throw new Error("Incorrect or missing date: " + date);
    return date;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist))
        throw new Error("Incorrect or missing description");
    return specialist;
};
const parseCodes = (diagnosisCodes) => {
    if (!diagnosisCodes || !Array.isArray(diagnosisCodes))
        throw new Error("Incorrect or missing diagnosticCodes");
    for (let x = 0; x < diagnosisCodes.length; x++)
        if (!isString(diagnosisCodes[x]))
            throw new Error("Code within diagnosticCodes is not a string");
    return diagnosisCodes;
};
const parseHealthCheckRating = (healthCheckRating) => {
    if (!healthCheckRating || !Number.isFinite(healthCheckRating))
        throw new Error("Incorrect or missing healthCheckRating");
    return healthCheckRating;
};
const toNewEntry = (entry) => {
    const newEntry = {
        description: parseDescription(entry.description),
        date: parseDate(entry.date),
        specialist: parseSpecialist(entry.specialist),
        diagnosisCodes: parseCodes(entry.diagnosisCodes),
        id: (0, uuid_1.v1)()
    };
    if (entry.discharge) {
        if (!entry.discharge.date
            || !entry.discharge.criteria
            || !isString(entry.discharge.date)
            || !isString(entry.discharge.criteria))
            throw new Error("Invalid discharge");
        newEntry.discharge = entry.discharge;
        newEntry.type = "Hospital";
    }
    else if (entry.employerName) {
        if (!isString(entry.employerName))
            throw new Error("Invalid employer name");
        newEntry.employerName = entry.employerName;
        newEntry.type = "OccupationalHealthcare";
    }
    else if (entry.healthCheckRating) {
        newEntry.healthCheckRating = parseHealthCheckRating(entry.healthCheckRating);
        if (newEntry.healthCheckRating < 0 || newEntry.healthCheckRating > 3)
            throw new Error("Health check rating is too large or too low");
        newEntry.type = "HealthCheck";
    }
    else
        throw new Error("Missing Entry type parameters");
    return newEntry;
};
exports.default = toNewEntry;
