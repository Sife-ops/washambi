package main

import (
	"log"
	"net/http"

	"brynhildr/router"
	"washambi-lib/db"
	"washambi-lib/env"
)

func init() {
	if e := db.InitPgConn(); e != nil {
		log.Fatalf("db: %v", e)
	}
}

func main() {
	log.Printf("brynhildr %s", env.BrynhildrUrl)
	if e := router.Serve(); e != http.ErrServerClosed {
		log.Fatalf("http: %v", e)
	}
}
