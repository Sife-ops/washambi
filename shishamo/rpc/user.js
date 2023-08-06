import shishamo_pb from "washambi-rpc/shishamo/v1/shishamo_pb.js";
import ts from "google-protobuf/google/protobuf/timestamp_pb.js";
import { db } from "../db/connection.js";
import { strict as assert } from "node:assert";

/**
 * @param {import("kysely").Selectable<import("@db/schema.ts").User>} user
 * @returns {shishamo_pb.User}
 */
function userFromDb(user) {
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
 * @param {import("@grpc/grpc-js").ServerUnaryCall<shishamo_pb.UserCreateRequest, shishamo_pb.UserCreateResponse>} call
 * @param {import("@grpc/grpc-js").sendUnaryData<shishamo_pb.UserCreateResponse>} callback
 */
export async function userCreate(call, callback) {
    const a = await db
        .insertInto("user")
        .values({
            email: call.request.getEmail(),
            password: call.request.getPassword(),
        })
        .returningAll()
        .executeTakeFirst();

    const r = new shishamo_pb.UserCreateResponse();
    r.setUser(userFromDb(a));

    callback(null, r);
}

/** @param {import("washambi-rpc/shishamo/v1/shishamo_grpc_pb.js").ShishamoClient} client */
export function userCreateTestInt(client) {
    return () => {
        // console.log("unit test");

        const request = new shishamo_pb.UserCreateRequest();
        request.setEmail("int@int.com");
        request.setPassword("yesk");

        client.userCreate(request, function(err, response) {
            if (err) {
                console.log(err);
            }
            console.log("got response:");
            console.log(response.getUser().toObject());
        });

        assert.strictEqual(1, 1);
    }
}

/**
 * @param {import("@grpc/grpc-js").ServerUnaryCall<shishamo_pb.UserGetOneRequest, shishamo_pb.UserGetOneResponse>} call
 * @param {import("@grpc/grpc-js").sendUnaryData<shishamo_pb.UserGetOneResponse>} callback
 */
export async function userGetOne(call, callback) {
    try {
        const a = await db
            .selectFrom("user")
            .where("id", "=", call.request.getId())
            .selectAll()
            .executeTakeFirstOrThrow();

        const r = new shishamo_pb.UserGetOneResponse();
        r.setUser(userFromDb(a));

        callback(null, r);
    } catch {
        // todo: callback(someError);
    }
}

/**
 * @param {import("@grpc/grpc-js").ServerUnaryCall<shishamo_pb.UserChangePasswordRequest, shishamo_pb.UserChangePasswordResponse>} call
 * @param {import("@grpc/grpc-js").sendUnaryData<shishamo_pb.UserChangePasswordResponse>} callback
 */
export async function userChangePassword(call, callback) {
    const a = await db
        .updateTable("user")
        .set({ password: call.request.getPassword() })
        .where("id", "=", call.request.getId())
        .returningAll()
        .executeTakeFirst();

    const r = new shishamo_pb.UserChangePasswordResponse();
    r.setUser(userFromDb(a));

    callback(null, r);
}

