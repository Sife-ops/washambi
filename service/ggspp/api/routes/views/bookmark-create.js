
/** @type {import("express").RequestHandler} */
export async function bookmarkCreate(req, res) {
    // todo: try/catch
    // const rpcReq = new shishamo_pb.DomainGetAllRequest();
    // rpcReq.setUserId(req.signedCookies.id);
    // const rpcRes = await rpc.promise.domainGetAll(rpcReq);

    res.render("_page", {
        pageName: "bookmark-create",
        options: {},
    });
};

