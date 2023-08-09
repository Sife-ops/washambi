CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE SCHEMA IF NOT EXISTS "zoomers";

CREATE TABLE "zoomers"."user" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),

    "email" character varying NOT NULL UNIQUE,
    "password" character varying NOT NULL,

    "created_at" timestamp NOT NULL DEFAULT NOW(),
    -- "updated_at" timestamp DEFAULT NULL,
    "deleted_at" timestamp DEFAULT NULL,

    PRIMARY KEY ("id")
);

