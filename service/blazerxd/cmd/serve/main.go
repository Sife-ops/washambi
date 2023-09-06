// https://stackoverflow.com/questions/59014404/referencing-a-go-module-that-is-local

package main

import (
	"blazerxd/rpc"
	"log"
)

func main() {
	log.Println("starting blazerxd...")
	if e := rpc.Serve(); e != nil {
		log.Fatalf("grpc server: %v", e)
	}
}
