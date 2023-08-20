package rpc

import (
	"database/sql"

	blazerxd_pb "washambi-rpc/blazerxd/v1"

	_ "github.com/jackc/pgx/v5/stdlib"
)

type Server struct {
	Db *sql.DB
	blazerxd_pb.UnimplementedBlazerxdServer
}
