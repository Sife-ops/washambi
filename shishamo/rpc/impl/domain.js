import timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb.js";
import joi from "joi";
import { sql } from "kysely";
import shishamo_pb from "washambi-rpc/shishamo/v1/shishamo_pb.js";
import { db } from "../../db/connection.js";
import { DuplicateDomainError, toRpcError } from "../../error/rpc.js";
import { testingClient } from "../../rpc/client.js";
import { bookmarkFromDb, domainFromDb } from "./_from.js";
import { clearTestUser, createTestDomain, createTestUser, testDomainTemplate } from "./_test.js";
const { Timestamp } = timestamp_pb;

/** @type {import("@grpc/grpc-js").handleUnaryCall<shishamo_pb.DomainCreateRequest, shishamo_pb.DomainCreateResponse>} */
export async function domainCreate(call, callback) {
    try {
        await joi.string().domain().validateAsync(call.request.getName());

        const f = await db
            .selectFrom("nuland.domain")
            .where("user_id", "=", call.request.getUserId())
            .where("name", "=", call.request.getName())
            .selectAll()
            .execute();

        if (f.length > 0) {
            throw new DuplicateDomainError(call.request.getName());
        }

        const d = await db
            .insertInto("nuland.domain")
            .values({
                user_id: call.request.getUserId(),
                name: call.request.getName(),
            })
            .returningAll()
            .executeTakeFirst();

        const r = new shishamo_pb.DomainCreateResponse();
        r.setDomain(domainFromDb(d));

        callback(null, r);
    } catch (e) {
        // console.log(e)
        const error = toRpcError(e);
        callback(error);
    }
}

if (import.meta.vitest) {
    const { describe, test, expect, beforeEach } = import.meta.vitest;

    describe("int :: domainCreate", function () {
        const request = new shishamo_pb.DomainCreateRequest();

        beforeEach(async function () {
            await clearTestUser();
            const u = await createTestUser();
            request.setUserId(u.id);
            request.setName(testDomainTemplate.name.toString());
            return async function () {
                await clearTestUser();
            };
        });

        test("success", async function () {
            const response = await testingClient.get().promise.domainCreate(request);
            expect(response.hasDomain()).toBeTruthy();
        });

        test("invalid domain error", async function () {
            request.setName("lol");
            try {
                await testingClient.get().promise.domainCreate(request);
            } catch (e) {
                expect(e.code).toEqual(3);
            }
        });

        test("duplicate domain error", async function () {
            await createTestDomain(request.getUserId());
            try {
                await testingClient.get().promise.domainCreate(request);
            } catch (e) {
                expect(e.code).toEqual(6);
            }
        });
    });
}

/** @type {import("@grpc/grpc-js").handleUnaryCall<shishamo_pb.DomainGetAllRequest, shishamo_pb.DomainGetAllResponse>} */
export async function domainGetAll(call, callback) {
    try {
        const f = await db
            .selectFrom("nuland.domain")
            .where("user_id", "=", call.request.getUserId())
            .where(sql`deleted_at is null`)
            .selectAll()
            .execute();

        // console.log(f)

        const r = new shishamo_pb.DomainGetAllResponse();
        r.setDomainsList(f.map(x => domainFromDb(x)));

        callback(null, r);
    } catch (e) {
        // console.log(e)
        const error = toRpcError(e);
        callback(error);
    }
}

if (import.meta.vitest) {
    const { describe, test, expect, beforeEach } = import.meta.vitest;

    describe("int :: domainGetAll", function () {
        const request = new shishamo_pb.DomainGetAllRequest();

        beforeEach(async function () {
            await clearTestUser();
            const u = await createTestUser();
            request.setUserId(u.id);
            return async function () {
                await clearTestUser();
            };
        });

        test("success", async function () {
            await Promise.all(
                [
                    { name: "reallycool123.com" },
                    { name: "reallycool456.com" },
                    { name: "reallycool789.com" },
                ].map(
                    x => db
                        .insertInto("nuland.domain")
                        .values({
                            user_id: request.getUserId(),
                            name: x.name,
                        })
                        .execute()
                )
            );

            await db
                .updateTable("nuland.domain")
                .set({ deleted_at: new Date() })
                .where("name", "=", "reallycool789.com")
                .execute();

            const response = await testingClient.get().promise.domainGetAll(request);
            // console.log(response.getDomainsList().map(x => x.toObject()));

            expect(response.getDomainsList().length).toBe(2);
        });

        // no error thrown by kysely
        test.skip("no such user error", async function () {
            try {
                request.setUserId("3349e3c9-8c12-4c19-a9c6-43255cd49089");
                await testingClient.get().promise.domainGetAll(request);
            } catch (e) {
                //
                console.log(e)
            }
        })
    });
}

/** @type {import("@grpc/grpc-js").handleUnaryCall<shishamo_pb.DomainGetOneRequest, shishamo_pb.DomainGetOneResponse>} */
export async function domainGetOne(call, callback) {
    try {
        const d = await db
            .selectFrom("nuland.domain")
            .where("id", "=", call.request.getId())
            // .where("user_id", "=", call.request.get)
            .selectAll()
            .executeTakeFirstOrThrow();

        // todo: join
        const b = await db
            .selectFrom("nuland.bookmark")
            .where("domain_id", "=", call.request.getId())
            .selectAll()
            .execute();

        const r = new shishamo_pb.DomainGetOneResponse();
        r.setDomain(domainFromDb(d));
        r.setBookmarksList(b.map(x => bookmarkFromDb(x)))

        callback(null, r);
    } catch (e) {
        // console.log(e)
        callback(toRpcError(e));
    }
}

if (import.meta.vitest) {
    const { describe, test, expect, beforeEach } = import.meta.vitest;

    describe("int :: domainGetOne", function () {
        const request = new shishamo_pb.DomainGetOneRequest();

        beforeEach(async function () {
            await clearTestUser();
            return async function () {
                await clearTestUser();
            };
        });

        test("success", async function () {
            const u = await createTestUser();
            const d = await createTestDomain(u.id);
            request.setId(d.id);

            const response = await testingClient.get().promise.domainGetOne(request);
            // console.log(response.getDomain().toObject());

            expect(response.hasDomain()).toBeTruthy();
        });

        test("no such domain error", async function () {
            request.setId("0cc19d73-6128-426c-ae15-52671dc218f8");
            try {
                await testingClient.get().promise.domainGetOne(request);
            } catch (e) {
                expect(e.code).toBe(5);
            }
        });
    });
}

/** @type {import("@grpc/grpc-js").handleUnaryCall<shishamo_pb.DomainDeleteRequest, shishamo_pb.DomainDeleteResponse>} */
export async function domainDelete(call, callback) {
    try {
        const d = await db
            .updateTable("nuland.domain")
            .set({ deleted_at: new Date() })
            .where("id", "=", call.request.getId())
            .returningAll()
            .executeTakeFirstOrThrow();

        const r = new shishamo_pb.DomainDeleteResponse();
        r.setDomain(domainFromDb(d));

        callback(null, r);
    } catch (e) {
        // console.log(e)
        callback(toRpcError(e));
    }
}

if (import.meta.vitest) {
    const { describe, test, expect, beforeEach } = import.meta.vitest;

    describe("int :: domainDelete", function () {
        const request = new shishamo_pb.DomainDeleteRequest();

        beforeEach(async function () {
            await clearTestUser();
            return async function () {
                await clearTestUser();
            };
        });

        test("success", async function () {
            const u = await createTestUser();
            const d = await createTestDomain(u.id);
            request.setId(d.id);

            const response = await testingClient.get().promise.domainDelete(request);
            // console.log(response.getDomain().toObject());

            expect(response.getDomain().getDeletedAt()).toBeDefined();
        });

        // todo: redundant?
        test("no such domain error", async function () {
            request.setId("0cc19d73-6128-426c-ae15-52671dc218f8");
            try {
                await testingClient.get().promise.domainDelete(request);
            } catch (e) {
                expect(e.code).toBe(5);
            }
        });
    });
}
