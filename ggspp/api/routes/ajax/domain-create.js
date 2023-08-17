import shishamo_pb from "washambi-rpc/shishamo/v1/shishamo_pb.js";
import { client as rpc } from "../../../rpc/client.js";

/** @type {import("express").RequestHandler<{}, {}, {domainCreateName: string}>} */
export async function domainCreate(req, res) {
  try {
    // console.log(req.body);
    
    const rpcReq = new shishamo_pb.DomainCreateRequest();
    rpcReq.setName(req.body.domainCreateName);
    rpcReq.setUserId(req.signedCookies.id);
    const rpcRes = await rpc.promise.domainCreate(rpcReq);
    // console.log(rpcRes.getDomain().toObject());

    res.send("success");
    //   .setHeader("HX-Trigger", "sign-up-success")
    //   .send(await ejs.renderFile("./web/partial/sign-up-success.ejs"));
  } catch (e) {
    let error = "";

    if (e.code === 6) {
      error = "domain already exists";
    } else if (e.code === 3) {
      error = "invalid domain";
    } else {
      console.log(e);
      error = "unknown error";
    }

    res.send(error);
    // res.setHeader("HX-Trigger", "sign-up-error").send(
    //   await ejs.renderFile("./web/partial/sign-up-error.ejs", {
    //     error,
    //   })
    // );
  }
}
