package main

import (
	"elonbust/router"
	"log"
	"washambi-lib/env"
)

func main() {
	log.Printf("elonbust %s", env.ElonbustUrl)
	if e := router.Serve(); e != nil {
		log.Printf("serve error: %v", e)
	}
}
