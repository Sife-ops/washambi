import shishamo_pb from "washambi-rpc/shishamo/v1/shishamo_pb.js";
import { client as rpc } from "../../../rpc/client.js";

/** @type {import("express").RequestHandler<{}, {}, {domainCreateName: string}>} */
export async function domainCreate(req, res) {
    try {
        const rpcReq = new shishamo_pb.DomainCreateRequest();
        rpcReq.setName(req.body.domainCreateName);
        rpcReq.setUserId(req.signedCookies.id);
        const rpcRes = await rpc.promise.domainCreate(rpcReq);

        // todo: hx-swap-oob didn't work
        res
            .setHeader("HX-Trigger", JSON.stringify({
                "domain-create-status": {
                    "status": "success",
                }
            }))
            .send(`
                <tr>
                    <td>${rpcRes.getDomain().getName()}</td>
                    <td>
                        <button hx-delete="/domain-delete/${rpcRes.getDomain().getId()}">Delete</button>
                    </td>
                </tr>
            `);
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

        res
            .setHeader("HX-Trigger", JSON.stringify({
                "domain-create-status": {
                    "status": "error",
                    "message": error,
                }
            }))
            .send()
    }
}
