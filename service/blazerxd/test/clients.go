package test

import (
	"database/sql"
	"log"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	blazerxd_pb "washambi-rpc/blazerxd/v1"
)

func NewGrpcClient() blazerxd_pb.BlazerxdClient {
	c, e := grpc.Dial("localhost:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if e != nil {
		// return nil, e
		log.Fatalf("dial err: %v", e)
	}
	cl := blazerxd_pb.NewBlazerxdClient(c)
	return cl
}

type TestClients struct {
	Db   *sql.DB
	Grpc blazerxd_pb.BlazerxdClient
}
