import express from "express";
import * as ajax from "./routes/ajax.js";
import * as views from "./routes/views.js";

export const router = express.Router();

router.get("/", views.root);
router.get("/sign-in", views.signIn);
router.post("/sign-in", ajax.signIn);
router.get("/sign-up", views.signUp);
router.post("/sign-up", ajax.signUp);

router.use(function (req, res, next) {
  if (!req.signedCookies.id) {
    if (req.headers["hx-request"]) {
      res
        .setHeader("HX-Trigger", "sign-out")
        .send();
      return;
    }
    res.redirect("/sign-in");
    return;
  }
  next();
});

router.get("/temp", views.temp);
router.post("/domain-create", ajax.domainCreate);
