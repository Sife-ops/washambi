CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE SCHEMA IF NOT EXISTS "zoomers";

CREATE TABLE "zoomers"."user" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),

    "username" character varying NOT NULL UNIQUE,
    -- "discriminator" character varying NOT NULL,
    -- "email" character varying NOT NULL UNIQUE,
    "password" character varying NOT NULL,

    "recovery_prompt_1" character varying NOT NULL,
    "recovery_prompt_2" character varying NOT NULL,
    "recovery_prompt_3" character varying NOT NULL,

    "recovery_answer_1" character varying NOT NULL,
    "recovery_answer_2" character varying NOT NULL,
    "recovery_answer_3" character varying NOT NULL,

    "created_at" timestamp NOT NULL DEFAULT NOW(),
    "updated_at" timestamp DEFAULT NULL,
    "deleted_at" timestamp DEFAULT NULL,

    PRIMARY KEY ("id")
);

CREATE TABLE "zoomers"."cookie" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),

    "hashKey" bytea NOT NULL,
    "blockKey" bytea NOT NULL,

    "created_at" timestamp NOT NULL DEFAULT NOW(),

    PRIMARY KEY ("id")
);
