package rpc

import (
	"fmt"
	"log"
	"net"

	"google.golang.org/grpc"

	env "washambi-env"
	blazerxd_pb "washambi-rpc/blazerxd/v1"
)

type ServerImpl struct {
	blazerxd_pb.UnimplementedBlazerxdServer
}

func Serve() error {
	l, e := net.Listen("tcp", fmt.Sprintf(":%s", env.BlazerxdPort))
	if e != nil {
		log.Fatalf("grpc listen: %v", e)
	}

	g := grpc.NewServer()
	blazerxd_pb.RegisterBlazerxdServer(g, &ServerImpl{})

	return g.Serve(l)
}
