package client

import (
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	"washambi-lib/env"
	blazerxd_pb "washambi-lib/rpc/blazerxd/v1"
)

var BlazerxdClient blazerxd_pb.BlazerxdClient

func CreateBlazerxdClient() error {
	c, e := grpc.Dial(
		env.BlazerxdUrl,
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	)
	if e != nil {
        return e
	}

    BlazerxdClient = blazerxd_pb.NewBlazerxdClient(c)
    return nil
}
