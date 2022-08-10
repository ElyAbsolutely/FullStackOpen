"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    console.log("Someone pinged here");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send("pong");
});
exports.default = router;
