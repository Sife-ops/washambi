package main

import (
	"log"
	"net/http"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	"fancypenosi/router"
	blazerxd_pb "washambi-rpc/blazerxd/v1"
)

func main() {
	// rpc
	c, e := grpc.Dial(
		"localhost:50051",
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	)
	if e != nil {
		log.Fatalf("grpc dial err: %v", e)
	}
	g := blazerxd_pb.NewBlazerxdClient(c)

	// http
	r, e := router.NewRouter(g)
	if e != nil {
		log.Fatalf("chi router err: %v", e)
	}
	s := http.Server{
		Addr:    ":3000",
		Handler: r,
	}
	if e := s.ListenAndServe(); e != http.ErrServerClosed {
		log.Fatalf("http serve error: %v", e)
	}
}
