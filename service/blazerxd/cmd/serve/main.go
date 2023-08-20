// https://stackoverflow.com/questions/59014404/referencing-a-go-module-that-is-local

package main

import (
	"log"
	"net"

	"blazerxd/rpc"
	blazerxd_pb "washambi-rpc/blazerxd/v1"

	_ "github.com/jackc/pgx/v5/stdlib"
	"google.golang.org/grpc"
)

func main() {
	listener, e := net.Listen("tcp", ":50051")
	if e != nil {
		log.Fatalf("listen err: %v", e)
	}
    defer listener.Close()

	grpcServer := grpc.NewServer()
	defer grpcServer.Stop()
    serverImpl, e := rpc.NewServerImpl()
	blazerxd_pb.RegisterBlazerxdServer(grpcServer, serverImpl)

	if e := grpcServer.Serve(listener); e != nil {
		log.Fatalf("grpc err: %v", e)
	}

    // todo: output something
}
