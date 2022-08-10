import express from "express";
const router = express.Router();

import service from "../services/serviceDiagnoses";

router.get("/", (_req, res) => {
    const data = service.getDiagnoses();
    console.log("Fetching all diagnoses");
    res.send(data);
});

export default router;