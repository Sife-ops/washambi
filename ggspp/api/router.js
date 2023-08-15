import express from "express";
import { root } from "./routes/root.js";

export const router = express.Router();

router.get("/", root);





