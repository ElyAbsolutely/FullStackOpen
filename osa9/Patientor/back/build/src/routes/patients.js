"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const servicePatients_1 = __importDefault(require("../services/servicePatients"));
const utils_1 = __importDefault(require("../utils"));
router.get("/", (_req, res) => {
    const data = servicePatients_1.default.getPatientsNoSSN();
    console.log("Fetching all patients!", data);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(data);
});
router.post("/", (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient = (0, utils_1.default)(req.body);
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
exports.default = router;
