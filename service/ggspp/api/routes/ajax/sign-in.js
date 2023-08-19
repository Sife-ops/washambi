import argon2 from "argon2";
import ejs from "ejs";
import shishamo_pb from "washambi-rpc/shishamo/v1/shishamo_pb.js";
import { client as rpc } from "../../../rpc/client.js";

/** @type {import("express").RequestHandler<{}, {}, {email: string, password: string}>} */
export async function signIn(req, res) {
  try {
    const rpcReq = new shishamo_pb.UserGetOneRequest();
    rpcReq.setEmail(req.body.email);

    const rpcRes = await rpc.promise.userGetOne(rpcReq);

    // console.log(rpcRes.getUser().toObject())
    const ver = await argon2.verify(
      rpcRes.getUser().getPassword(),
      req.body.password
    );
    if (!ver) throw new IncorrectPasswordError("incorrect password");

    res
      .cookie("id", rpcRes.getUser().getId(), {
        httpOnly: true,
        signed: true,
        // maxAge: 15000,
        maxAge: 300000,
        sameSite: true,
      })
      .setHeader("HX-Redirect", "/temp")
      .send();
  } catch (e) {
    let problem = "";

    if (e instanceof IncorrectPasswordError) {
      problem = "incorrect password";
    } else if (e.code === 5) {
      problem = "account does not exist";
    }

    res.send(
      await ejs.renderFile("./web/partial/sign-in-problem.ejs", {
        problem,
      })
    );
  }
}

class IncorrectPasswordError extends Error {}
