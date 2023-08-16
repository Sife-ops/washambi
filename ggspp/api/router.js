import express from "express";
import * as ajax from "./routes/ajax.js";
import * as views from "./routes/views.js";

export const router = express.Router();

router.get("/", views.root);
router.get("/sign-in", views.signIn);
router.post("/sign-in_", ajax.signIn);

// todo: authentication
router.use(function (req, res, next) {
  console.log(req.signedCookies);
  if (!req.signedCookies.tk) {
    res.redirect("/sign-in");
    return;
  }
  next();
});

router.get("/temp", views.temp);
