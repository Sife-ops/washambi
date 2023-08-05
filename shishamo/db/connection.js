import pg from "pg"; const { Pool } = pg;
import { Kysely, PostgresDialect } from "kysely";

/** @returns {import("kysely").KyselyConfig} */
function connection() {
    switch (process.env.SHISHAMO_DB) {
        case "postgres-local": {
            return {
                dialect: new PostgresDialect({
                    pool: new Pool({
                        database: "washambi_pg_local",
                        host: "localhost",
                        user: "washambi_pg_local",
                        password: "washambi_pg_local",
                        port: 5432,
                        max: 10,
                    })
                })
            };
        }
        default: {
            throw new Error("todo");
        }
    }
}

/** @type {Kysely<import("./schema.ts").DB>} */
export const db = new Kysely(connection());
