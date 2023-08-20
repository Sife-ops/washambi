import { expect, test } from "vitest";

import blazerxd_grpc_pb from "washambi-rpc/blazerxd/v1/blazerxd_grpc_pb.js"
import blazerxd_pb from "washambi-rpc/blazerxd/v1/blazerxd_pb.js";
import { ClientWrapper } from "node-grpc-wrapper";
import { credentials } from "@grpc/grpc-js";

const client = new ClientWrapper(
    new blazerxd_grpc_pb.BlazerxdClient(
        "localhost:50051", // todo: hardcoded
        credentials.createInsecure(),
    )
)

test("create", async function() {
    const req = new blazerxd_pb.CreateRequest();
    req.setEmail("blazer@xd.com");
    req.setPassword("blazerxd");

    const res = await client.promise.create(req);

    console.log(res.toObject())
})
