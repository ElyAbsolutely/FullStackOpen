/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from "express";
const app = express();

app.use(express.json());

import bmi from "./bmiCalculator";
import exer from "./exerciseCalculator";

app.get("/ping", (_req, res) => {
    res.send("pong");
});

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    const a = req.query.height;
    const b = req.query.weight;

    const height = Number(a);
    const weight = Number(b);

    const result = bmi(height, weight);
    res.send(result);
});

app.post("/bmi", (req, res) => {
    const exercises = [];
    for (let x = 0; x < req.body.daily_exercises.length; x++)
        exercises.push(Number(req.body.daily_exercises[x]));
    const target = Number(req.body.target);

    const result = exer(exercises, target);
    res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});