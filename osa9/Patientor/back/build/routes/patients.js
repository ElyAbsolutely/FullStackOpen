"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const servicePatients_1 = __importDefault(require("../services/servicePatients"));
const utils_toNewPatient_1 = __importDefault(require("../utils/utils_toNewPatient"));
const utils_toNewEntry_1 = __importDefault(require("../utils/utils_toNewEntry"));
router.get("/", (_req, res) => {
    console.log("Fetching all patients");
    const data = servicePatients_1.default.getPatientsNoSSN();
    res.send(data);
});
router.get("/:id", (req, res) => {
    console.log("Getting a patient by id:", req.params.id);
    const data = servicePatients_1.default.getSpecificPatient(req.params.id);
    if (data === null)
        res.status(404).send(req.params.id + " doesnt match any patients´ id");
    else
        res.send(data);
});
router.post("/", (req, res) => {
    try {
        console.log("A new patient was added:", req.body);
        const newPatient = (0, utils_toNewPatient_1.default)(req.body);
        const addedPatient = servicePatients_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (e) {
        let errorMessage = "Error: ";
        if (e instanceof Error)
            errorMessage += e.message;
        res.status(400).send(errorMessage);
    }
});
router.post("/:id/entries", (req, res) => {
    try {
        console.log("Adding a new entry for Patient:", req.params.id, req.body);
        const newEntry = (0, utils_toNewEntry_1.default)(req.body);
        const patientWithNewEntry = servicePatients_1.default.addEntrytoPatient(req.params.id, newEntry);
        res.json(patientWithNewEntry);
    }
    catch (e) {
        let errorMessage = "Error: ";
        if (e instanceof Error)
            errorMessage += e.message;
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
