// only used in tests

package rpc

import (
	"log"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	blazerxd_pb "washambi-rpc/blazerxd/v1"
)

func NewClient() blazerxd_pb.BlazerxdClient {
	c, e := grpc.Dial("localhost:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if e != nil {
		// return nil, e
		log.Fatalf("dial err: %v", e)
	}
	cl := blazerxd_pb.NewBlazerxdClient(c)
	return cl
}
