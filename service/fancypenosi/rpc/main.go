package rpc

import (
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	blazerxd_pb "washambi-rpc/blazerxd/v1"
)

var BlazerxdClient blazerxd_pb.BlazerxdClient

func CreateBlazerxdClient() error {
	c, e := grpc.Dial(
		"localhost:50051",
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	)
	if e != nil {
		return e
	}

	BlazerxdClient = blazerxd_pb.NewBlazerxdClient(c)

	return nil
}
