package client

import (
	"log"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	"washambi-lib/env"
	laboof_pb "washambi-lib/rpc/laboof/v1"
)

func CreateLaboofClient() laboof_pb.LaboofClient {
	c, e := grpc.Dial(
		env.LaboofUrl,
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	)
	if e != nil {
		log.Fatalf("grpc init: %v", e)
	}

	return laboof_pb.NewLaboofClient(c)
}

var LaboofClient = CreateLaboofClient()
