// https://stackoverflow.com/questions/59014404/referencing-a-go-module-that-is-local

package main

import (
	"blazerxd/rpc"
	_ "github.com/jackc/pgx/v5/stdlib"
	"log"
)

func main() {
	s, e := rpc.NewServer()
	if e != nil {
		log.Fatalf("serve err: %v", e)
	}

    log.Println("starting blazerxd...")
	if e := s.Serve(); e != nil {
		log.Fatalf("serve err: %v", e)
	}
}
