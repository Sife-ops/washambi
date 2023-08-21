package rpc

import (
	"database/sql"
	"net"

	_ "github.com/jackc/pgx/v5/stdlib"
	"google.golang.org/grpc"

	"blazerxd/db"
	blazerxd_pb "washambi-rpc/blazerxd/v1"
)

type ServerImpl struct {
	Db *sql.DB
	blazerxd_pb.UnimplementedBlazerxdServer
}

func NewServerImpl() (*ServerImpl, error) {
	d, e := db.PostgresConnection()
	if e != nil {
		return nil, e
	}

	return &ServerImpl{
		Db: d,
	}, nil
}

type Server struct {
	listener   net.Listener
	grpcServer *grpc.Server
}

func NewServer() (*Server, error) {
	l, e := net.Listen("tcp", ":50051")
	if e != nil {
		return nil, e
	}

	i, e := NewServerImpl()
	if e != nil {
		return nil, e
	}

	g := grpc.NewServer()
	blazerxd_pb.RegisterBlazerxdServer(g, i)

	return &Server{l, g}, nil
}

func (s *Server) Serve() error {
	return s.grpcServer.Serve(s.listener)
}
