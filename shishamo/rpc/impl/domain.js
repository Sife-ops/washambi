import timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb.js";
import joi from "joi";
import shishamo_pb from "washambi-rpc/shishamo/v1/shishamo_pb.js";
import { db } from "../../db/connection.js";
import { DuplicateDomainError, toRpcError } from "../../error/rpc.js";
import { testingClient } from "../../rpc/client.js";
const { Timestamp } = timestamp_pb;

/**
 * @param {import("kysely").Selectable<import("@db/db.d.ts").NulandDomain>} d
 * @returns {shishamo_pb.Domain}
 */
function domainFromDb(d) {
    const domain = new shishamo_pb.Domain();

    domain.setId(d.id);
    domain.setUserId(d.user_id);
    domain.setName(d.name);
    domain.setCreatedAt(Timestamp.fromDate(d.created_at));
    if (d.deleted_at) {
        domain.setDeletedAt(Timestamp.fromDate(d.deleted_at));
    }

    return domain;
}

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

// used in tests
// todo: not dry, duplicated in user.js
/** @type {import("kysely").InsertObject<import("@db/db.d.ts").DB, "zoomers.user">} */
let testUserTemplate = {
    email: "bing2@chilling.com",
    password: "bingchilling123!",
};

/** @type {import("kysely").InsertObject<import("@db/db.d.ts").DB, "nuland.domain">} */
let testDomainTemplate = {
    name: "reallycooldomainname.com",
};

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

/**
 * @param {string} user_id
 * @returns {Promise<import("kysely").Selectable<import("@db/db.d.ts").NulandDomain>>}
 */
async function createTestDomain(user_id) {
    return await db
        .insertInto("nuland.domain")
        .values({
            ...testDomainTemplate,
            user_id,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
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
