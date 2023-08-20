// https://stackoverflow.com/questions/59014404/referencing-a-go-module-that-is-local

package main

import (
	"log"
	"net"

	"blazerxd/rpc"
	"blazerxd/sql"
	blazerxd_pb "washambi-rpc/blazerxd/v1"

	_ "github.com/jackc/pgx/v5/stdlib"
	"google.golang.org/grpc"
)

func main() {
	// sql
	connection := sql.PostgresConnection()
	defer connection.Close()

	// rpc
	listener, e := net.Listen("tcp", ":50051")
	if e != nil {
		log.Fatalf("listen err: %v", e)
	}

	grpcServer := grpc.NewServer()
	defer grpcServer.Stop()
	blazerxd_pb.RegisterBlazerxdServer(grpcServer, &rpc.BlazerxdServer{Db: connection})

	if e := grpcServer.Serve(listener); e != nil {
		log.Fatalf("server err: %v", e)
	}
}
