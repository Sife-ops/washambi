CREATE SCHEMA IF NOT EXISTS "nuland";

CREATE TABLE "nuland"."tag" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "user_id" UUID NOT NULL,

    "name" character varying NOT NULL,

    "created_at" timestamp NOT NULL DEFAULT NOW(),
    -- "updated_at" timestamp DEFAULT NULL,
    "deleted_at" timestamp DEFAULT NULL,

    PRIMARY KEY ("id"),
    FOREIGN KEY ("user_id")
        REFERENCES "zoomers"."user" ("id")
        ON DELETE CASCADE
);

--
-- domain
--
CREATE TABLE "nuland"."domain" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "user_id" UUID NOT NULL,

    "name" character varying NOT NULL,

    "created_at" timestamp NOT NULL DEFAULT NOW(),
    -- "updated_at" timestamp DEFAULT NULL,
    "deleted_at" timestamp DEFAULT NULL,

    PRIMARY KEY ("id"),
    FOREIGN KEY ("user_id")
        REFERENCES "zoomers"."user" ("id")
        ON DELETE CASCADE
);

CREATE TABLE "nuland"."domains_tags" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "domain_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,

    PRIMARY KEY ("id"),
    FOREIGN KEY ("domain_id")
        REFERENCES "nuland"."domain" ("id")
        ON DELETE CASCADE,
    FOREIGN KEY ("tag_id")
        REFERENCES "nuland"."tag" ("id")
        ON DELETE CASCADE
);

--
-- bookmark
--
-- todo: fields?
CREATE TABLE "nuland"."bookmark" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "user_id" UUID NOT NULL,
    "domain_id" UUID NOT NULL,

    "description" character varying NOT NULL,
    "url" character varying NOT NULL,

    "created_at" timestamp NOT NULL DEFAULT NOW(),
    -- "updated_at" timestamp DEFAULT NULL,
    "deleted_at" timestamp DEFAULT NULL,

    PRIMARY KEY ("id"),
    FOREIGN KEY ("user_id")
        REFERENCES "zoomers"."user" ("id")
        ON DELETE CASCADE,
    FOREIGN KEY ("domain_id")
        REFERENCES "nuland"."domain" ("id")
        ON DELETE CASCADE
);

CREATE TABLE "nuland"."bookmarks_tags" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "bookmark_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,

    PRIMARY KEY ("id"),
    FOREIGN KEY ("bookmark_id")
        REFERENCES "nuland"."bookmark" ("id")
        ON DELETE CASCADE,
    FOREIGN KEY ("tag_id")
        REFERENCES "nuland"."tag" ("id")
        ON DELETE CASCADE
);

CREATE TABLE "nuland"."bookmark_field" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "bookmark_id" UUID NOT NULL,

    "index" integer NOT NULL,
    "name" character varying NOT NULL,
    "hidden" boolean NOT NULL DEFAULT false,

    "created_at" timestamp NOT NULL DEFAULT NOW(),
    "deleted_at" timestamp DEFAULT NULL,

    PRIMARY KEY ("id"),
    FOREIGN KEY ("bookmark_id")
        REFERENCES "nuland"."bookmark" ("id")
        ON DELETE CASCADE
);

CREATE TABLE "nuland"."bookmark_field_value" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "bookmark_field_id" UUID NOT NULL,

    "value" character varying NOT NULL,

    "created_at" timestamp NOT NULL DEFAULT NOW(),

    PRIMARY KEY ("id"),
    FOREIGN KEY ("bookmark_field_id")
        REFERENCES "nuland"."bookmark_field" ("id")
        ON DELETE CASCADE
);

--
-- profile
--
CREATE TABLE "nuland"."profile" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "domain_id" UUID NOT NULL,

    "index" integer NOT NULL,
    "name" character varying NOT NULL,

    "created_at" timestamp NOT NULL DEFAULT NOW(),
    "deleted_at" timestamp DEFAULT NULL,

    PRIMARY KEY ("id"),
    FOREIGN KEY ("domain_id")
        REFERENCES "nuland"."domain" ("id")
        ON DELETE CASCADE
);

CREATE TABLE "nuland"."profile_field" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "profile_id" UUID NOT NULL,

    "index" integer NOT NULL,
    "name" character varying NOT NULL,
    "hidden" boolean NOT NULL DEFAULT false,

    "created_at" timestamp NOT NULL DEFAULT NOW(),
    "deleted_at" timestamp DEFAULT NULL,

    PRIMARY KEY ("id"),
    FOREIGN KEY ("profile_id")
        REFERENCES "nuland"."profile" ("id")
        ON DELETE CASCADE
);

CREATE TABLE "nuland"."profile_field_value" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "profile_field_id" UUID NOT NULL,

    "value" character varying NOT NULL,

    "created_at" timestamp NOT NULL DEFAULT NOW(),

    PRIMARY KEY ("id"),
    FOREIGN KEY ("profile_field_id")
        REFERENCES "nuland"."profile_field" ("id")
        ON DELETE CASCADE
);

