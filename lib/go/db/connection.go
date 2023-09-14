package db

import (
	"database/sql"
	"fmt"
	"log"
	"strconv"

	_ "github.com/jackc/pgx/v5/stdlib"

	"washambi-lib/env"
)

func PostgresConnection() *sql.DB {
	p, e := strconv.Atoi(env.PgPort)
	if e != nil {
		log.Fatalf("parse int: %v", e)
	}

	cs := fmt.Sprintf("host=%s port=%d dbname=%s user=%s password=%s sslmode=disable",
		env.PgHost,
		p,
		env.PgDatabase,
		env.PgUser,
		env.PgPassword,
	)

	// todo: c.Close()?
	c, e := sql.Open("pgx", cs)
	if e != nil {
		log.Fatalf("database connection: %v", e)
	}

	return c
}

var Connection = PostgresConnection()
