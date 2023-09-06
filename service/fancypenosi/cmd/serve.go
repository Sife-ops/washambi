package main

import (
	"log"
	"net/http"

	"fancypenosi/router"
)

func main() {
	if e := router.Serve(); e != http.ErrServerClosed {
		log.Fatalf("http serve error: %v", e)
	}
}
