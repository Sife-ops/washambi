import empty_pb from "google-protobuf/google/protobuf/empty_pb.js"; const { Empty } = empty_pb;
import joi from "joi";
import shishamo_pb from "washambi-rpc/shishamo/v1/shishamo_pb.js";
import timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb.js"; const { Timestamp } = timestamp_pb;
import { db } from "../../db/connection.js";
// import { log } from "../../logger/logger.js";
import { testingClient } from "../../rpc/client.js";
import { toRpcError } from "../../error/rpc.js";

/**
 * @param {import("kysely").Selectable<import("@db/db.d.ts").ZoomersUser>} user
 * @returns {shishamo_pb.User}
 */
function userFromDb(user) {
    const u = new shishamo_pb.User();

    u.setId(user.id);
    u.setEmail(user.email);
    u.setPassword(user.password);
    u.setCreatedAt(Timestamp.fromDate(user.created_at));
    if (user.deleted_at) {
        u.setDeletedAt(Timestamp.fromDate(user.deleted_at));
    }

    return u;
}

/** @type {import("@grpc/grpc-js").handleUnaryCall<shishamo_pb.UserCreateRequest, shishamo_pb.UserCreateResponse>} */
export async function userCreate(call, callback) {
    try {
        await joi.string().email().validateAsync(call.request.getEmail());

        const a = await db
            .insertInto("zoomers.user")
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
        const error = toRpcError(e);
        // log(import.meta, "info", {
        //     context: { request: call.request.toObject() },
        //     errors: [e, error]
        // });
        callback(error);
    }
}

// used in tests
/** @type {import("kysely").InsertObject<import("@db/db.d.ts").DB, "zoomers.user">} */
let testUserTemplate = {
    email: "bing@chilling.com",
    password: "bingchilling123!",
}

/** @returns {Promise<import("kysely").Selectable<import("@db/db.d.ts").ZoomersUser>>} */
async function createTestUser() {
    return await db
        .insertInto("zoomers.user")
        .values(testUserTemplate)
        .returningAll()
        .executeTakeFirstOrThrow();
}

async function clearTestUser() {
    try {
        await db
            .deleteFrom("zoomers.user")
            .where("email", "=", testUserTemplate.email)
            .execute();
    } catch { }
}

if (import.meta.vitest) {
    const { describe, test, expect, beforeEach } = import.meta.vitest;

    describe("int :: userCreate", function() {
        const request = new shishamo_pb.UserCreateRequest();

        beforeEach(async function() {
            request.setEmail(testUserTemplate.email.toString());
            request.setPassword(testUserTemplate.password.toString());
            await clearTestUser();
            return async function() {
                await clearTestUser();
            }
        });

        test("invalid email error", async function() {
            request.setEmail("lol");
            try {
                await testingClient.get().promise.userCreate(request);
            } catch (e) {
                expect(e.code).toEqual(3);
            }
        });

        test.skip("invalid password error", async function() {
            request.setPassword("lol");
            try {
                await testingClient.get().promise.userCreate(request);
            } catch (e) {
                expect(e.code).toEqual(3);
            }
        });

        test("create user", async function() {
            const response = await testingClient.get().promise.userCreate(request);
            expect(response.hasUser()).toBeTruthy();
        });

        test("duplicate key error (email)", async function() {
            await createTestUser();
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
            .selectFrom("zoomers.user")
            .where("email", "=", call.request.getEmail())
            .selectAll()
            .executeTakeFirstOrThrow();

        const r = new shishamo_pb.UserGetOneResponse();
        r.setUser(userFromDb(a));

        callback(null, r);
    } catch (e) {
        // console.log(e)
        callback(toRpcError(e));
    }
}

if (import.meta.vitest) {
    const { describe, test, expect, beforeAll } = import.meta.vitest;

    describe("int :: userGetOne", function() {
        const request = new shishamo_pb.UserGetOneRequest();

        beforeAll(async function() {
            await clearTestUser();
            const testUser = await createTestUser();
            request.setEmail(testUser.email);

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
            request.setEmail("some@guy.com");
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
        // await joi
        //     .string()
        //     .pattern(passwordRegex)
        //     .validateAsync(call.request.getPassword());

        const a = await db
            .updateTable("zoomers.user")
            .set({ password: call.request.getPassword() })
            .where("id", "=", call.request.getId())
            .returningAll()
            .executeTakeFirst();

        const r = new shishamo_pb.UserChangePasswordResponse();
        r.setUser(userFromDb(a));

        callback(null, r);
    } catch (e) {
        callback(toRpcError(e));
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

        test("valid password", async function() {
            const newPassword = "something123!"
            request.setPassword(newPassword);

            const response = await testingClient.get().promise.userChangePassword(request);
            expect(response.hasUser()).toBeTruthy();
            expect(response.getUser().getPassword()).toBe(newPassword);
        });

        test.skip("invalid password error", async function() {
            request.setPassword("");

            try {
                await testingClient.get().promise.userChangePassword(request);
            } catch (e) {
                expect(e.code).toBe(3);
            }
        });
    });
}

/** @type {import("@grpc/grpc-js").handleUnaryCall<shishamo_pb.UserPurgeRequest, empty_pb.Empty>} */
export async function userPurge(call, callback) {
    try {
        await db
            .deleteFrom("zoomers.user")
            .where("id", "=", call.request.getId())
            // todo: doesn't throw when missing, select before delete?
            .executeTakeFirstOrThrow();

        callback(null, new Empty());
    } catch (e) {
        // console.log(e)
        callback(toRpcError(e));
    }
}

if (import.meta.vitest) {
    const { describe, test, expect, beforeAll } = import.meta.vitest;

    describe("int :: userPurge", function() {
        const request = new shishamo_pb.UserPurgeRequest();

        beforeAll(async function() {
            await clearTestUser();
            const testUser = await createTestUser();
            request.setId(testUser.id);

            return async function() {
                await clearTestUser();
            }
        })

        test("purge existing user", async function() {
            await testingClient.get().promise.userPurge(request);
        });

        test.skip("missing user error", async function() {
            request.setId("d9b8224c-36a1-11ee-82aa-0242ac110002");
            try {
                await testingClient.get().promise.userPurge(request);
            } catch (e) {
                console.log(e);
                expect(e.code).toBe(5);
            }
        });

        // todo: code 3
    });
}

/** @type {import("@grpc/grpc-js").handleUnaryCall<shishamo_pb.UserTokenRequest, shishamo_pb.UserTokenResponse>} */
export async function userToken(call, callback) {
    try {
        await db
            .selectFrom("zoomers.user")
            .where("id", "=", call.request.getId())
            .executeTakeFirstOrThrow();

        const r = new shishamo_pb.UserTokenResponse();
        r.setToken("todo");

        callback(null, r);
    } catch (e) {
        // console.log(e)
        callback(toRpcError(e));
    }
}

