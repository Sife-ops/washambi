package db

import (
	"database/sql"
	"fmt"
	"strconv"

	_ "github.com/jackc/pgx/v5/stdlib"

	"washambi-lib/env"
)

var Connection *sql.DB

func PostgresConnection() error {
	p, e := strconv.Atoi(env.PgPort)
	if e != nil {
        return e
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
        return e
	}

    Connection = c
    return nil
}

