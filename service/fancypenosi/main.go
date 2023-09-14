package main

import (
	"log"
	"net/http"
	"time"

	"fancypenosi/router"
	"washambi-lib/db"
	"washambi-lib/env"
)

func main() {
	go func() {
		for range time.Tick(time.Second * 5) {
			db.CookieKeysNew()
		}
	}()

	log.Printf("fancypenosi %s", env.FancypenosiUrl)
	if e := router.Serve(); e != http.ErrServerClosed {
		log.Fatalf("http serve error: %v", e)
	}
}
