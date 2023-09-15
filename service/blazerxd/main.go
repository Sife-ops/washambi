// https://stackoverflow.com/questions/59014404/referencing-a-go-module-that-is-local

package main

import (
	"log"

	"blazerxd/rpc"
	"washambi-lib/env"
	"washambi-lib/db"
)

func init() {
    if e := db.PostgresConnection(); e != nil {
        log.Fatalf("db: %v", e)
    }
}

func main() {
	log.Printf("blazerxd %s", env.BlazerxdUrl)
	if e := rpc.Serve(); e != nil {
		log.Fatalf("rpc: %v", e)
	}
}
