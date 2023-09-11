package client

import (
	"log"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	"washambi-lib/env"
	blazerxd_pb "washambi-lib/rpc/blazerxd/v1"
)

func CreateBlazerxdClient() blazerxd_pb.BlazerxdClient {
	c, e := grpc.Dial(
		env.BlazerxdUrl,
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	)
	if e != nil {
		log.Fatalf("grpc init: %v", e)
	}

	return blazerxd_pb.NewBlazerxdClient(c)
}

var BlazerxdClient = CreateBlazerxdClient()
