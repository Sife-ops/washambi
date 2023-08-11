import express from "express";
import * as user from "./routes/user.js"

export const router = express.Router();

router.post("/signup", user.signUp);
router.post("/signin", user.signIn);



