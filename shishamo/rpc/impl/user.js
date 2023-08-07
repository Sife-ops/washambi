import shishamo_pb from "washambi-rpc/shishamo/v1/shishamo_pb.js";
import ts from "google-protobuf/google/protobuf/timestamp_pb.js";
import { db } from "../../db/connection.js";
import { testingClient } from "../../rpc/client.js";

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
    try {
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
    } catch (e) {
        switch (e.code) {
            case "23505":
                callback({ code: 6, details: e.detail });
                break;

            default:
                callback({ code: 2 });
                break;
        }
    }
}

if (import.meta.vitest) {
    const { describe, test, expect } = import.meta.vitest;

    const request = new shishamo_pb.UserCreateRequest();
    request.setEmail("int@int.com");
    request.setPassword("yesk");

    const clearUser = async function() {
        try {
            await db
                .deleteFrom("user")
                .where("email", "=", request.getEmail())
                .execute();
        } catch { }
    };

    describe("int :: userCreate", function() {
        test("int :: userCreate :: pre", clearUser);

        test("int :: userCreate :: create user", async function() {
            const response = await testingClient.get().promise.userCreate(request);
            expect(response.hasUser()).toBeTruthy();
        });

        test("int :: userCreate :: duplicate key error (email)", async function() {
            try {
                await testingClient.get().promise.userCreate(request);
            } catch (e) {
                expect(e.code).toEqual(6);
            }
        });

        test("int :: userCreate :: post", clearUser);
    });
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

