package rpc

import (
	"database/sql"

	_ "github.com/jackc/pgx/v5/stdlib"

	"blazerxd/db"
	blazerxd_pb "washambi-rpc/blazerxd/v1"
)

type ServerImpl struct {
	Db *sql.DB
	blazerxd_pb.UnimplementedBlazerxdServer
}

func NewServerImpl() (*ServerImpl, error) {
	d, e := db.PostgresConnection()
	if e != nil {
		return nil, e
	}

	return &ServerImpl{
		Db: d,
	}, nil
}
