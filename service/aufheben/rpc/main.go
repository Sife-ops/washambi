package rpc

import (
	"fmt"
	"net"

	"google.golang.org/grpc"

	"washambi-lib/env"
	aufheben_pb "washambi-lib/rpc/aufheben/v1"
)

type ServerImpl struct {
	aufheben_pb.UnimplementedAufhebenServer
}

func Serve() error {
	l, e := net.Listen("tcp", fmt.Sprintf(":%s", env.AufhebenPort))
	if e != nil {
        return e
	}

	g := grpc.NewServer()
	aufheben_pb.RegisterAufhebenServer(g, &ServerImpl{})

	return g.Serve(l)
}
