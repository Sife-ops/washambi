import * as config from "../config.js";
import pg from "pg";
import { Kysely, PostgresDialect } from "kysely";

/** @returns {import("kysely").KyselyConfig} */
function connection() {
    switch (config.shishamoDb()) {
        case "postgres-local": {
            pg.Client
            return {
                dialect: new PostgresDialect({
                    pool: new pg.Pool({
                        database: "washambi_local",
                        host: "localhost",
                        user: "washambi_local", // todo: rename
                        password: "washambi",
                        port: 5432,
                        max: 10,
                    }),
                })
            };
        }
        default: {
            throw new Error("todo");
        }
    }
}

/** @type {Kysely<import("@db/db.d.ts").DB>} */
export const db = new Kysely(connection());
