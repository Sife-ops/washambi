import { db } from "../../db/connection.js";

// user

/** @type {import("kysely").InsertObject<import("@db/db.d.ts").DB, "zoomers.user">} */
export let testUserTemplate = {
    email: "bing@chilling.com",
    password: "bingchilling123!",
};

/** @returns {Promise<import("kysely").Selectable<import("@db/db.d.ts").ZoomersUser>>} */
export async function createTestUser() {
    return await db
        .insertInto("zoomers.user")
        .values(testUserTemplate)
        .returningAll()
        .executeTakeFirstOrThrow();
}

export async function clearTestUser() {
    try {
        await db
            .deleteFrom("zoomers.user")
            .where("email", "=", testUserTemplate.email)
            .execute();
    } catch { }
}

// domain

/** @type {import("kysely").InsertObject<import("@db/db.d.ts").DB, "nuland.domain">} */
export let testDomainTemplate = {
    name: "reallycooldomainname.com",
};

/**
 * @param {string} user_id
 * @returns {Promise<import("kysely").Selectable<import("@db/db.d.ts").NulandDomain>>}
 */
export async function createTestDomain(user_id) {
    return await db
        .insertInto("nuland.domain")
        .values({
            ...testDomainTemplate,
            user_id,
        })
        .returningAll()
        .executeTakeFirstOrThrow();
}

// bookmark

/** @type {import("kysely").InsertObject<import("@db/db.d.ts").DB, "nuland.bookmark">} */
export let testBookmarkTemplate = {
    description: "rly informative page",
    url: "https://strats.cheatcc.com/goldeneye",
};
