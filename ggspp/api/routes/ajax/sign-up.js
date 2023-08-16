import argon2 from "argon2";
import ejs from "ejs";
import joi from "joi";
import shishamo_pb from "washambi-rpc/shishamo/v1/shishamo_pb.js";
import { client as rpc } from "../../../rpc/client.js";

/** @type {import("express").RequestHandler<{}, {}, {email: string, password: string}>} */
export async function signUp(req, res) {
  try {
    await joi.string().email().validateAsync(req.body.email);
    const passwordRegex = new RegExp(
      "^(?=.*[0-9])(?=.*[_!@#$%^&*])[a-zA-Z0-9_!@#$%^&*]{8,32}$"
    );
    await joi.string().regex(passwordRegex).validateAsync(req.body.password);

    const rpcReq = new shishamo_pb.UserCreateRequest();
    rpcReq.setEmail(req.body.email);
    // todo: perform hash on shishamo?
    const hashed = await argon2.hash(req.body.password);
    rpcReq.setPassword(hashed);

    const rpcRes = await rpc.promise.userCreate(rpcReq);
    console.log(rpcRes.getUser().toObject());

    // todo: show confirmation
    // todo: res.redirect?
    res.setHeader("HX-Redirect", "/sign-in").send(); // todo: breaks hx-target
  } catch (e) {
    let problem = "";

    if (e instanceof joi.ValidationError) {
      if (e.message.includes("email")) {
        problem = "must use a valid email";
      }
      if (e.message.includes("required pattern")) {
        problem = "must use a stronger password";
      }
    } else if (e.code === 6) {
      // todo: find actual error class
      //   console.log(e);
      problem = "email already in use";
    } else {
      problem = "unknown error";
    }

    res.send(
      await ejs.renderFile("./web/partial/sign-up-problem.ejs", {
        problem,
      })
    );
  }
}
