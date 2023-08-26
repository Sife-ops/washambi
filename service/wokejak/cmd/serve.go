package main

import (
	"log"

	"wokejak/router"
)

func main() {
    if e := router.CreateAndServe(); e != nil {
        log.Fatalf("serve error: %v", e)
    }
}
