package test

import (
	"log"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	env "washambi-env"
	blazerxd_pb "washambi-rpc/blazerxd/v1"
)

func CreateBlazerxdClient() blazerxd_pb.BlazerxdClient {
    log.Println(env.BlazerxdUrl)
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
