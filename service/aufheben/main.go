package main

import (
	"log"

	"aufheben/rpc"
	"washambi-lib/env"
	"washambi-lib/db"
)

func init() {
    if e := db.InitPgConn(); e != nil {
        log.Fatalf("db: %v", e)
    }
}

func main() {
	log.Printf("aufheben %s", env.BlazerxdUrl)
	if e := rpc.Serve(); e != nil {
		log.Fatalf("rpc: %v", e)
	}
}
