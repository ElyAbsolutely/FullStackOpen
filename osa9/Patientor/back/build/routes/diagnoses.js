"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const serviceDiagnoses_1 = __importDefault(require("../services/serviceDiagnoses"));
router.get("/", (_req, res) => {
    const data = serviceDiagnoses_1.default.getDiagnoses();
    console.log("Fetching all diagnoses");
    res.send(data);
});
exports.default = router;
