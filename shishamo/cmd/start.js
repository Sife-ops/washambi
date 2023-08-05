import "./cli.js";

import { Server, ServerCredentials } from "@grpc/grpc-js";

import { db } from "../db/connection.js";

import shishamo_grpc_pb from "washambi-rpc/shishamo/v1/shishamo_grpc_pb.js"; const { ShishamoServiceService } = shishamo_grpc_pb;
import shishamo_pb from "washambi-rpc/shishamo/v1/shishamo_pb.js"; const { UserCreateResponse, User } = shishamo_pb;

/**
 * todo: use type handleUnaryCall<hw.HelloRequest, hw.HelloReply>
 * @param {import("@grpc/grpc-js").ServerUnaryCall<shishamo_pb.UserCreateRequest, shishamo_pb.UserCreateResponse>} call
 * @param {import("@grpc/grpc-js").sendUnaryData<shishamo_pb.UserCreateResponse>} callback
 */
async function userCreate(call, callback) {
    const a = await db
        .insertInto("user")
        .values({
            email: call.request.getEmail(),
            password: call.request.getPassword(),
        })
        .returningAll()
        .executeTakeFirst();

    const b = new User();
    b.setId(a.id);
    b.setEmail(a.email);
    b.setPassword(a.password);
    b.setCreatedAt(a.created_at.toString());
    // b.setDeletedAt(a.deleted_at.toString());

    const r = new UserCreateResponse();
    r.setUser(b);

    callback(null, r);
}

async function main() {
    console.log("starting shishamo");

    const server = new Server();
    server.addService(ShishamoServiceService, {
        userCreate
    });
    server.bindAsync("0.0.0.0:50051", ServerCredentials.createInsecure(), () => {
        console.log("starting grpc");
        server.start();
    });
}

main();
