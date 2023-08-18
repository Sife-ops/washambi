import shishamo_pb from "washambi-rpc/shishamo/v1/shishamo_pb.js";
import { client as rpc } from "../../../rpc/client.js";

/** @type {import("express").RequestHandler<{domain: string}, {}, {domainCreateName: string}>} */
export async function domainDelete(req, res) {
    try {
        const rpcReq = new shishamo_pb.DomainDeleteRequest();
        rpcReq.setId(req.params.domain);
        await rpc.promise.domainDelete(rpcReq);

        res
            .setHeader("HX-Redirect", "/temp")
            .send();
    } catch (e) {
        //
    }
}

