package main

import (
	"fancypenosi/router"
	"log"
	"net/http"
	"washambi-lib/env"
)

func main() {
	log.Printf("fancypenosi %s", env.FancypenosiUrl)
	if e := router.Serve(); e != http.ErrServerClosed {
		log.Fatalf("http serve error: %v", e)
	}
}
