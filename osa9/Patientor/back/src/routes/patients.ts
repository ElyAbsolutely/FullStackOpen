import express from "express";
const router = express.Router();

import service from "../services/servicePatients";
import toNewPatient from "../utils/utils_toNewPatient";
import toNewEntry from "../utils/utils_toNewEntry";

router.get("/", (_req, res) => {
    console.log("Fetching all patients");
    const data = service.getPatientsNoSSN();
    res.send(data);
});

router.get("/:id", (req, res) => {
    console.log("Getting a patient by id:", req.params.id);
    const data = service.getSpecificPatient(req.params.id);
    if (data === null)
        res.status(404).send(req.params.id + " doesnt match any patients´ id");
    else
        res.send(data);
});

router.post("/", (req, res) => {
    try {
        console.log("A new patient was added:", req.body);
        const newPatient = toNewPatient(req.body);
        const addedPatient = service.addPatient(newPatient);

        res.json(addedPatient);
    } catch (e: unknown) {
        let errorMessage = "Error: ";
        if (e instanceof Error)
            errorMessage += e.message;
        res.status(400).send(errorMessage);
    }
});

router.post("/:id/entries", (req, res) => {
    try {
        console.log("Adding a new entry for Patient:", req.params.id, req.body);
        const newEntry = toNewEntry(req.body);
        const patientWithNewEntry = service.addEntrytoPatient(req.params.id, newEntry);

        res.json(patientWithNewEntry);
    } catch (e: unknown) {
        let errorMessage = "Error: ";
        if (e instanceof Error)
            errorMessage += e.message;
        res.status(400).send(errorMessage);
    }
});

export default router;