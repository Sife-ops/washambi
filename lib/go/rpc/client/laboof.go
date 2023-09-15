package client

import (
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	"washambi-lib/env"
	laboof_pb "washambi-lib/rpc/laboof/v1"
)

var LaboofClient laboof_pb.LaboofClient

func CreateLaboofClient() error {
	c, e := grpc.Dial(
		env.LaboofUrl,
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	)
	if e != nil {
		return e
	}

	LaboofClient = laboof_pb.NewLaboofClient(c)
	return nil
}
