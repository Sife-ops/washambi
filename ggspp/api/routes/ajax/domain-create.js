import shishamo_pb from "washambi-rpc/shishamo/v1/shishamo_pb.js";
import { client as rpc } from "../../../rpc/client.js";

/** @type {import("express").RequestHandler<{}, {}, {domainCreateName: string}>} */
export async function domainCreate(req, res) {
    try {
        const rpcReq = new shishamo_pb.DomainCreateRequest();
        rpcReq.setName(req.body.domainCreateName);
        rpcReq.setUserId(req.signedCookies.id);
        const rpcRes = await rpc.promise.domainCreate(rpcReq);

        res
            .setHeader("HX-Trigger", "domain-create-status")
            .send(`
                <div 
                    id="domainCreateStatus"
                    class="m-1 p-1 outline outline-1 outline-green-500 bg-green-900"
                >
                    ✅ success!
                </div>

                <div id="domainList" hx-swap-oob="beforeend">
                    <div>${rpcRes.getDomain().getName()}</div>
                </div>
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
            .setHeader("HX-Trigger", "domain-create-status")
            .send(`
                <div 
                    id="domainCreateStatus"
                    class="m-1 p-1 outline outline-1 outline-red-500 bg-red-900"
                >
                    🚫 ${error}
                </div>
            `);
    }
}
