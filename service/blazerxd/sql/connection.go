package sql

import (
	"database/sql"
	"fmt"
)

func PostgresConnection() *sql.DB {
	cs := fmt.Sprintf("host=%s port=%d dbname=%s user=%s password=%s sslmode=disable",
		"localhost",
		5432,
		"washambi_local",
		"washambi_local",
		"washambi",
	)

	c, e := sql.Open("pgx", cs)
	if e != nil {
		panic(e)
	}

	return c
}
