CREATE SCHEMA IF NOT EXISTS "tomlinson";

CREATE TABLE "tomlinson"."kanban" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),

    "name" character varying NOT NULL,

    "created_at" timestamp NOT NULL DEFAULT NOW(),
    "updated_at" timestamp DEFAULT NULL,
    "deleted_at" timestamp DEFAULT NULL,

    PRIMARY KEY ("id")
);

CREATE TABLE "tomlinson"."users_kanbans" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "user_id" UUID NOT NULL,
    "kanban_id" UUID NOT NULL,

    "role" character varying NOT NULL,

    "created_at" timestamp NOT NULL DEFAULT NOW(),
    "updated_at" timestamp DEFAULT NULL,
    "deleted_at" timestamp DEFAULT NULL,
    
    PRIMARY KEY ("id"),
    FOREIGN KEY ("user_id")
        REFERENCES "zoomers"."user" ("id")
        ON DELETE CASCADE,
    FOREIGN KEY ("kanban_id")
        REFERENCES "tomlinson"."kanban" ("id")
        ON DELETE CASCADE
);

CREATE TABLE "tomlinson"."swimlane" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "kanban_id" UUID NOT NULL,

    "name" character varying NOT NULL,
    "index" integer NOT NULL,

    "created_at" timestamp NOT NULL DEFAULT NOW(),
    "updated_at" timestamp DEFAULT NULL,
    "deleted_at" timestamp DEFAULT NULL,

    PRIMARY KEY ("id"),
    FOREIGN KEY ("kanban_id")
        REFERENCES "tomlinson"."kanban" ("id")
        ON DELETE CASCADE
);

CREATE TABLE "tomlinson"."card" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "kanban_id" UUID NOT NULL,
    "swimlane_id" UUID NOT NULL,

    "name" character varying NOT NULL,
    "description" character varying NOT NULL,
    "details" character varying NOT NULL,

    "created_at" timestamp NOT NULL DEFAULT NOW(),
    "updated_at" timestamp DEFAULT NULL,
    "deleted_at" timestamp DEFAULT NULL,

    PRIMARY KEY ("id"),
    FOREIGN KEY ("kanban_id")
        REFERENCES "tomlinson"."kanban" ("id")
        ON DELETE CASCADE,
    FOREIGN KEY ("swimlane_id")
        REFERENCES "tomlinson"."swimlane" ("id")
        ON DELETE CASCADE
);

