import "./cli.js";

import ts from "google-protobuf/google/protobuf/timestamp_pb.js";
import { Server, ServerCredentials } from "@grpc/grpc-js";
import { db } from "../db/connection.js";

import shishamo_grpc_pb from "washambi-rpc/shishamo/v1/shishamo_grpc_pb.js";
import shishamo_pb from "washambi-rpc/shishamo/v1/shishamo_pb.js";

/**
 * @param {import("kysely").Selectable<import("@db/schema.ts").User>} user
 * @returns {shishamo_pb.User}
 */
function ligma(user) {
    const u = new shishamo_pb.User();

    u.setId(user.id);
    u.setEmail(user.email);
    u.setPassword(user.password);
    u.setCreatedAt(ts.Timestamp.fromDate(user.created_at));
    if (user.deleted_at) {
        u.setDeletedAt(ts.Timestamp.fromDate(user.deleted_at));
    }

    return u;
}

/**
 * @param {import("@grpc/grpc-js").ServerUnaryCall<shishamo_pb.UserChangePasswordRequest, shishamo_pb.UserChangePasswordResponse>} call
 * @param {import("@grpc/grpc-js").sendUnaryData<shishamo_pb.UserChangePasswordResponse>} callback
 */
async function userChangePassword(call, callback) {
    const a = await db
        .updateTable("user")
        .set({ password: call.request.getPassword() })
        .where("id", "=", call.request.getId())
        .returningAll()
        .executeTakeFirst();

    const r = new shishamo_pb.UserCreateResponse();
    r.setUser(ligma(a));

    callback(null, r);
}

/**
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

    const r = new shishamo_pb.UserCreateResponse();
    r.setUser(ligma(a));

    callback(null, r);
}

async function main() {
    console.log("starting shishamo");

    const server = new Server();
    server.addService(shishamo_grpc_pb.ShishamoService, {
        userCreate,
        userChangePassword,
    });
    server.bindAsync("0.0.0.0:50051", ServerCredentials.createInsecure(), () => {
        console.log("starting grpc");
        server.start();
    });
}

main();
