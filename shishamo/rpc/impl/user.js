import * as rpcError from "../../error/rpc.js";
import shishamo_pb from "washambi-rpc/shishamo/v1/shishamo_pb.js";
import ts from "google-protobuf/google/protobuf/timestamp_pb.js";
import { db } from "../../db/connection.js";
import { log } from "../../logger/logger.js";
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
        log(import.meta, "error", { message: { description: "cool" } });
        callback(rpcError.handleRpcError(e));
    }
}

// used in tests
/** @type {import("kysely").InsertObject<import("@db/schema.ts").DB, "user">} */
let testUserTemplate = {
    email: "int@int.com",
    password: "bingchilling",
}

/** @returns {Promise<import("kysely").Selectable<import("@db/schema.ts").User>>} */
async function createTestUser() {
    return await db
        .insertInto("user")
        .values(testUserTemplate)
        .returningAll()
        .executeTakeFirstOrThrow();
}

async function clearTestUser() {
    try {
        await db
            .deleteFrom("user")
            .where("email", "=", testUserTemplate.email)
            .execute();
    } catch { }
}

if (import.meta.vitest) {
    const { describe, test, expect, beforeAll } = import.meta.vitest;

    describe("int :: userCreate", function() {
        const request = new shishamo_pb.UserCreateRequest();
        request.setEmail(testUserTemplate.email.toString());
        request.setPassword(testUserTemplate.password.toString());

        beforeAll(async function() {
            await clearTestUser();
            return async function() {
                await clearTestUser();
            }
        });

        // todo: valid password & email

        test("create user", async function() {
            const response = await testingClient.get().promise.userCreate(request);
            expect(response.hasUser()).toBeTruthy();
        });

        test("duplicate key error (email)", async function() {
            try {
                await testingClient.get().promise.userCreate(request);
            } catch (e) {
                expect(e.code).toEqual(6);
            }
        });
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
    } catch (e) {
        // console.log(e.code)
        callback(rpcError.handleRpcError(e));
    }
}

if (import.meta.vitest) {
    const { describe, test, expect, beforeAll } = import.meta.vitest;

    describe("int :: userGetOne", function() {
        const request = new shishamo_pb.UserGetOneRequest();

        beforeAll(async function() {
            await clearTestUser();
            const testUser = await createTestUser();
            request.setId(testUser.id);

            return async function() {
                await clearTestUser();
            }
        })

        test("get existing user", async function() {
            const response = await testingClient.get().promise.userGetOne(request);
            // console.log(response.getUser().toObject());
            expect(response.hasUser()).toBeTruthy();
            expect(response.getUser().getEmail()).toBe(testUserTemplate.email);
        });

        test("missing user error", async function() {
            request.setId("33");
            try {
                await testingClient.get().promise.userGetOne(request);
            } catch (e) {
                expect(e.code).toBe(5);
            }
        });
    });
}

/** @type {import("@grpc/grpc-js").handleUnaryCall<shishamo_pb.UserChangePasswordRequest, shishamo_pb.UserChangePasswordResponse>} */
export async function userChangePassword(call, callback) {
    try {
        if (call.request.getPassword().length < 1) {
            throw new rpcError.PasswordChangedToEmptyError();
        }

        const a = await db
            .updateTable("user")
            .set({ password: call.request.getPassword() })
            .where("id", "=", call.request.getId())
            .returningAll()
            .executeTakeFirst();

        const r = new shishamo_pb.UserChangePasswordResponse();
        r.setUser(userFromDb(a));

        callback(null, r);
    } catch (e) {
        callback(rpcError.handleRpcError(e));
    }
}

if (import.meta.vitest) {
    const { describe, test, expect, beforeAll } = import.meta.vitest;

    describe("int :: changePassword", function() {
        const request = new shishamo_pb.UserChangePasswordRequest();

        beforeAll(async function() {
            await clearTestUser();
            const testUser = await createTestUser();
            request.setId(testUser.id);

            return async function() {
                await clearTestUser();
            }
        })

        test("change to valid password", async function() {
            const newPassword = "something123"
            request.setPassword(newPassword);

            const response = await testingClient.get().promise.userChangePassword(request);
            // console.log(response.getUser().toObject());
            expect(response.hasUser()).toBeTruthy();
            expect(response.getUser().getPassword()).toBe(newPassword);
        });

        test("empty password error", async function() {
            const newPassword = ""
            request.setPassword(newPassword);

            try {
                await testingClient.get().promise.userChangePassword(request);
            } catch (e) {
                expect(e.details).toBe(new rpcError.PasswordChangedToEmptyError().details);
            }
        });
    });
}

