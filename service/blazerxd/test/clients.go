package test

import (
	"database/sql"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	"blazerxd/db"
	blazerxd_pb "washambi-rpc/blazerxd/v1"
)

type TestClients struct {
	Db   *sql.DB
	Grpc blazerxd_pb.BlazerxdClient
}

func NewTestClients() (*TestClients, error) {
	d, e := db.PostgresConnection()
	if e != nil {
		return nil, e
	}

    // todo: defer c.Close()?
	c, e := grpc.Dial("localhost:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if e != nil {
		return nil, e
		// log.Fatalf("dial err: %v", e)
	}
	g := blazerxd_pb.NewBlazerxdClient(c)

	return &TestClients{
		Db:   d,
		Grpc: g,
	}, nil
}
