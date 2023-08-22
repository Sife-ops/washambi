package db

import (
	"database/sql"
	"fmt"
)

func PostgresConnection() (*sql.DB, error) {
    // todo: env vars
	cs := fmt.Sprintf("host=%s port=%d dbname=%s user=%s password=%s sslmode=disable",
		"localhost",
		5432,
		"washambi_local",
		"washambi_local",
		"washambi",
	)

    // todo: c.Close()?
	c, e := sql.Open("pgx", cs)
	if e != nil {
		return nil, e
	}

	return c, nil
}
