import shishamo_pb from "washambi-rpc/shishamo/v1/shishamo_pb.js";
import { client as rpc } from "../../../rpc/client.js";

/** @type {import("express").RequestHandler<{}, {}, {description: string, url: string, tags: string}>} */
export async function bookmarkCreate(req, res) {
    try {
        const rpcReq = new shishamo_pb.BookmarkCreateRequest()
        rpcReq.setUserId(req.signedCookies.id);
        rpcReq.setDescription(req.body.description);
        rpcReq.setUrl(req.body.url);
        rpcReq.setTagsList(req.body.tags.split(" ").filter(x => x !== ""))
        await rpc.promise.bookmarkCreate(rpcReq);
        // console.log(rpcRes.getBookmark().toObject())

        res
            .setHeader("HX-Redirect", "/temp")
            .send();
    } catch (e) {
        // console.log(e)
        let message = "";

        if (e.code === 6) {
            message = "duplicate URL";
        } else if (e.code === 3) {
            message = "invalid input";
        } else {
            console.log(e);
            message = e.message;
        }

        res
            .setHeader("HX-Trigger", JSON.stringify({
                "bookmark-create-error": message,
            }))
            .send()
    }
}

