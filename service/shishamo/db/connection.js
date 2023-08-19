import pg from "pg";
import { Kysely, PostgresDialect } from "kysely";

/** @type {Kysely<import("@db/db.d.ts").DB>} */
export const db = new Kysely({
    dialect: new PostgresDialect({
        pool: new pg.Pool({
            database: process.env.WASHAMBI_PG_DATABASE,
            host: process.env.WASHAMBI_PG_HOST,
            user: process.env.WASHAMBI_PG_USER,
            password: process.env.WASHAMBI_PG_PASSWORD,
            port: parseInt(process.env.WASHAMBI_PG_PORT),
            max: 10,
        }),
    })
});
