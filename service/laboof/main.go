package main

import (
    "log"
    "washambi-lib/env"
    "laboof/rpc"
)

func main() {
    log.Printf("laboof %s", env.LaboofUrl)
    if e := rpc.Serve(); e != nil {
		log.Fatalf("grpc server: %v", e)
    }
}
