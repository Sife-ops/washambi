package main

import (
	"log"
	"net/http"
	"strconv"
	"time"

	"fancypenosi/router"
	"washambi-lib/db"
	"washambi-lib/env"
)

func main() {
	r, e := strconv.Atoi(env.FancypenosiCookieRotation)
	if e != nil {
		panic(e)
	}
	go func() {
		for range time.Tick(time.Second * time.Duration(r)) {
			db.CookieKeysNew()
		}
	}()

	log.Printf("fancypenosi %s", env.FancypenosiUrl)
	if e := router.Serve(); e != http.ErrServerClosed {
		log.Fatalf("http serve error: %v", e)
	}
}
