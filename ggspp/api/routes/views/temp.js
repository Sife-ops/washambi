import shishamo_pb from "washambi-rpc/shishamo/v1/shishamo_pb.js";
import { client as rpc } from "../../../rpc/client.js";

/** @type {import("express").RequestHandler} */
export async function temp(req, res) {
    const rpcReq = new shishamo_pb.DomainGetAllRequest();
    rpcReq.setUserId(req.signedCookies.id);
    const rpcRes = await rpc.promise.domainGetAll(rpcReq);

    res.render("_page", {
        pageName: "temp",
        options: {
            domains: rpcRes.getDomainsList().map(x => x.toObject()),
        },
    });
};
