import shishamo_pb from "washambi-rpc/shishamo/v1/shishamo_pb.js";
import { client as rpc } from "../../../rpc/client.js";

/** @type {import("express").RequestHandler<{}, {}, {domainCreateName: string}>} */
export async function domainCreate(req, res) {
    try {
        const rpcReq = new shishamo_pb.DomainCreateRequest();
        rpcReq.setName(req.body.domainCreateName);
        rpcReq.setUserId(req.signedCookies.id);
        const rpcRes = await rpc.promise.domainCreate(rpcReq);

        // hx-swap-oob sucks with tables???
        // reddit: https://old.reddit.com/r/htmx/comments/10rb2zs/please_help_me_understand_hxswapoob/j6wn4qq/
        // source: https://github.com/bigskysoftware/htmx/blob/master/src/htmx.js#L274
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
        let message = "";

        if (e.code === 6) {
            message = "domain already exists";
        } else if (e.code === 3) {
            message = "invalid domain";
        } else {
            console.log(e);
            message = "unknown error";
        }

        res
            .setHeader("HX-Trigger", JSON.stringify({
                "domain-create-status": {
                    status: "error",
                    message,
                }
            }))
            .send()
    }
}
