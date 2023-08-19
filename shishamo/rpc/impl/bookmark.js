import timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb.js";
import joi from "joi";
import tldjs from "tldjs";
import shishamo_pb from "washambi-rpc/shishamo/v1/shishamo_pb.js";
import { db } from "../../db/connection.js";
import { DuplicateBookmarkError, ParseDomainError, toRpcError } from "../../error/rpc.js";
import { testingClient } from "../../rpc/client.js";
import { clearTestUser, createTestUser, testBookmarkTemplate } from "./_test.js";
const { Timestamp } = timestamp_pb;

/**
 * @param {import("kysely").Selectable<import("@db/db.d.ts").NulandBookmark>} b
 * @returns {shishamo_pb.Bookmark}
 */
function bookmarkFromDb(b) {
    const bookmark = new shishamo_pb.Bookmark();

    bookmark.setId(b.id);
    bookmark.setUserId(b.user_id);
    bookmark.setDomainId(b.domain_id);
    bookmark.setDescription(b.description);
    bookmark.setUrl(b.url);
    bookmark.setCreatedAt(Timestamp.fromDate(b.created_at));
    if (b.deleted_at) {
        bookmark.setDeletedAt(Timestamp.fromDate(b.deleted_at));
    }

    return bookmark;
}

/** @type {import("@grpc/grpc-js").handleUnaryCall<shishamo_pb.BookmarkCreateRequest, shishamo_pb.BookmarkCreateResponse>} */
export async function bookmarkCreate(call, callback) {
    try {
        await joi.string().uri().validateAsync(call.request.getUrl());

        const f = await db
            .selectFrom("nuland.bookmark")
            .where("user_id", "=", call.request.getUserId())
            .where("url", "=", call.request.getUrl())
            .selectAll()
            .executeTakeFirst();

        if (f) {
            throw new DuplicateBookmarkError(call.request.getUrl());
        }

        const domainName = tldjs.getDomain(call.request.getUrl());

        if (!domainName) {
            throw new ParseDomainError(call.request.getUrl());
        }

        const b = await db.transaction().execute(async function (trx) {
            /** @returns {Promise<import("kysely").Selectable<import("@db/db.d.ts").NulandDomain>>} */
            async function selectOrInsertDomain() {
                const d = await trx
                    .selectFrom("nuland.domain")
                    .where("user_id", "=", call.request.getUserId())
                    .where("name", "=", domainName)
                    .selectAll()
                    .executeTakeFirst();
                if (d) return d;
                return await trx
                    .insertInto("nuland.domain")
                    .values({
                        user_id: call.request.getUserId(),
                        name: domainName,
                    })
                    .returningAll()
                    .executeTakeFirstOrThrow()
            }
            const d = await selectOrInsertDomain();

            const b = await trx
                .insertInto("nuland.bookmark")
                .values({
                    domain_id: d.id,
                    user_id: call.request.getUserId(),
                    description: call.request.getDescription(),
                    url: call.request.getUrl(),
                })
                .returningAll()
                .executeTakeFirst();

            if (call.request.getTagsList().length > 0) {
                const tags = await trx
                    .selectFrom("nuland.tag")
                    .where("name", "in", call.request.getTagsList())
                    .selectAll()
                    .execute();

                for (const reqTag of call.request.getTagsList()) {
                    /** @returns {Promise<import("kysely").Selectable<import("@db/db.d.ts").NulandTag>>} */
                    async function findOrInsertTag() {
                        const f = tags.find(x => x.name === reqTag);
                        if (f) return f;
                        return await trx
                            .insertInto("nuland.tag")
                            .values({
                                user_id: call.request.getUserId(),
                                name: reqTag,
                            })
                            .returningAll()
                            .executeTakeFirstOrThrow();
                    }
                    const tag = await findOrInsertTag();

                    await trx
                        .insertInto("nuland.bookmarks_tags")
                        .values({
                            bookmark_id: b.id,
                            tag_id: tag.id,
                        })
                        .returningAll()
                        .executeTakeFirstOrThrow();
                }
            }

            return b;
        });

        const r = new shishamo_pb.BookmarkCreateResponse();
        r.setBookmark(bookmarkFromDb(b));

        callback(null, r);
    } catch (e) {
        // console.log(e)
        const error = toRpcError(e);
        callback(error);
    }
}

if (import.meta.vitest) {
    const { describe, test, expect, beforeEach } = import.meta.vitest;

    describe("int :: bookmarkCreate", function () {
        const request = new shishamo_pb.BookmarkCreateRequest();

        beforeEach(async function () {
            await clearTestUser();
            const u = await createTestUser();
            request.setUserId(u.id);
            request.setDescription(testBookmarkTemplate.description.toString());
            request.setUrl(testBookmarkTemplate.url.toString());
            request.setTagsList(["cheddar", "gouda"]);
            return async function () {
                await clearTestUser();
            };
        });

        test.skip("scratch", async function () {
            // await joi.string().uri({scheme: [/https?/]}).validateAsync("https://emerson.goettsch.xyz/birthday")
            try {
                // await joi.string().uri().validateAsync("https://emerson.goettsch.xyz/birthday")
                await joi.string().uri().validateAsync("feiwjfiweof")
            } catch (e) {
                console.log(e)
            }
            // tldjs.parse("ewafewafwafa")
        });

        test("success", async function () {
            const response = await testingClient.get().promise.bookmarkCreate(request);
            expect(response.hasBookmark()).toBeTruthy();
            await db
                .selectFrom("nuland.domain")
                .where("name", "=", "cheatcc.com")
                .where("user_id", "=", request.getUserId())
                .selectAll()
                .executeTakeFirstOrThrow();
            const tags = await db
                .selectFrom("nuland.tag")
                .where("user_id", "=", request.getUserId())
                .selectAll()
                .execute()
            expect(tags.length).toBe(2);
        });

        test("invalid uri error", async function () {
            request.setUrl("asdf");
            try {
                await testingClient.get().promise.bookmarkCreate(request);
            } catch (e) {
                expect(e.code).toEqual(3);
            }
        });

        // todo: parse domain error

        test("duplicate bookmark error", async function () {
            await testingClient.get().promise.bookmarkCreate(request);
            try {
                await testingClient.get().promise.bookmarkCreate(request);
            } catch (e) {
                expect(e.code).toEqual(6);
            }
        });
    });
}

