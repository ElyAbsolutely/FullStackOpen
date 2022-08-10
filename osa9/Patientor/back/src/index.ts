import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

import routerPinger from "./routes/pinger";
import routerDiagnoses from "./routes/diagnoses";
import routerPatients from "./routes/patients";

app.use("/api/ping", routerPinger);
app.use("/api/diagnoses", routerDiagnoses);
app.use("/api/patients", routerPatients);

const PORT = 3001;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});