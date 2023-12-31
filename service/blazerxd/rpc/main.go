package rpc

import (
	"fmt"
	"net"

	"google.golang.org/grpc"

	"washambi-lib/env"
	blazerxd_pb "washambi-lib/rpc/blazerxd/v1"
)

type ServerImpl struct {
	blazerxd_pb.UnimplementedBlazerxdServer
}

func Serve() error {
	l, e := net.Listen("tcp", fmt.Sprintf(":%s", env.BlazerxdPort))
	if e != nil {
        return e
	}

	g := grpc.NewServer()
	blazerxd_pb.RegisterBlazerxdServer(g, &ServerImpl{})

	return g.Serve(l)
}
