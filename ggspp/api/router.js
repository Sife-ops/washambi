import express from "express";
import * as views from "./routes/views.js";

export const router = express.Router();

router.get("/", views.root);
router.get("/temp", views.temp);

