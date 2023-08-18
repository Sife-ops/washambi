import shishamo_pb from "washambi-rpc/shishamo/v1/shishamo_pb.js";
import { client as rpc } from "../../../rpc/client.js";

/** @type {import("express").RequestHandler} */
export async function domain(req, res) {
    try {
        // console.log(req.params);
        const rpcReq = new shishamo_pb.DomainGetOneRequest();
        rpcReq.setId(req.params.domain); // todo: typedef
        const rpcRes = await rpc.promise.domainGetOne(rpcReq);

        res.render("_page", {
            pageName: "domain",
            options: {
                domain: rpcRes.getDomain().toObject(),
            },
        });
    } catch (e) {
        // todo: error page
    }
};
