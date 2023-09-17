package main

import (
	"log"
	"net/http"
	"strconv"
	"time"

	"fancypenosi/router"
	"washambi-lib/db"
	"washambi-lib/env"
	"washambi-lib/rpc/client"
)

func init() {
	if e := db.InitPgConn(); e != nil {
		log.Fatalf("db: %v", e)
	}
	if e := client.CreateBlazerxdClient(); e != nil {
		log.Fatalf("rpc: %v", e)
	}
}

func main() {
	r, e := strconv.Atoi(env.FancypenosiCookieRotation)
	if e != nil {
		log.Fatalf("env: %v", e)
	}
	go func() {
		for range time.Tick(time.Second * time.Duration(r)) {
			db.CookieKeysNew()
		}
	}()

	log.Printf("fancypenosi %s", env.FancypenosiUrl)
	if e := router.Serve(); e != http.ErrServerClosed {
		log.Fatalf("http: %v", e)
	}
}
