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

/** @type {import("@grpc/grpc-js").handleUnaryCall<shishamo_pb.UserCreateRequest, shishamo_pb.UserCreateResponse>} */
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

    // callback({code: 5, details: "lol"}); // error
    callback(null, r);
}

/** 
 * @param {import("washambi-rpc/shishamo/v1/shishamo_grpc_pb.js").ShishamoClient} client 
 * @param {import("kysely").Kysely<import("@db/schema.ts").DB>} db
 */
export function userCreateTestInt(client, db) {
    return () => {
        const request = new shishamo_pb.UserCreateRequest();
        request.setEmail("int@int.com");
        request.setPassword("yesk");

        // todo: await the response
        client.userCreate(request, function(error, response) {
            console.log(response);
            if (error) throw new Error();
            if (!response.hasUser()) throw new Error();

            // todo: shit takes 10 seconds
            db
                .deleteFrom("user")
                .where("id", "=", response.getUser().getId())
                .execute();
        });
    }
}

/** @type {import("@grpc/grpc-js").handleUnaryCall<shishamo_pb.UserGetOneRequest, shishamo_pb.UserGetOneResponse>} */
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

/** @type {import("@grpc/grpc-js").handleUnaryCall<shishamo_pb.UserChangePasswordRequest, shishamo_pb.UserChangePasswordResponse>} */
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

