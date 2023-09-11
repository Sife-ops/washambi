package rpc

import (
	"fmt"
	"log"
	"net"

	"google.golang.org/grpc"

	"washambi-lib/env"
	laboof_pb "washambi-lib/rpc/laboof/v1"
)

type ServerImpl struct {
	laboof_pb.UnimplementedLaboofServer
}

func Serve() error {
	l, e := net.Listen("tcp", fmt.Sprintf(":%s", env.LaboofPort))
	if e != nil {
		log.Fatalf("grpc listen: %v", e)
	}

	g := grpc.NewServer()
	laboof_pb.RegisterLaboofServer(g, &ServerImpl{})

	return g.Serve(l)
}
