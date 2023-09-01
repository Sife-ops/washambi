package main

import (
	"log"
	"net/http"

	"fancypenosi/router"
    "fancypenosi/rpc"
)

func main() {
    if e := rpc.CreateBlazerxdClient(); e != nil {
		log.Fatalf("grpc dial err: %v", e)
    }

	if e := router.Serve(); e != http.ErrServerClosed {
		log.Fatalf("http serve error: %v", e)
	}
}
