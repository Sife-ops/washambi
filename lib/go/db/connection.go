package db

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
	_ "github.com/jackc/pgx/v5/stdlib"

	"washambi-lib/env"
)

var PgConn *sql.DB

func InitPgConn() error {
	cs := fmt.Sprintf("host=%s port=%s dbname=%s user=%s password=%s sslmode=disable",
		env.PgHost,
		env.PgPort,
		env.PgDatabase,
		env.PgUser,
		env.PgPassword,
	)

	// todo: c.Close()?
	c, e := sql.Open("pgx", cs)
	if e != nil {
		return e
	}

	PgConn = c
	return nil
}

var PgxPool *pgxpool.Pool

func InitPgxPool() error {
	c, e := pgxpool.New(
		context.Background(),
		fmt.Sprintf(
			"postgres://%s:%s@%s:%s/%s",
			env.PgUser,
			env.PgPassword,
			env.PgHost,
			env.PgPort,
			env.PgDatabase,
		),
	)
	if e != nil {
		return e
	}
	PgxPool = c
	return nil
}
