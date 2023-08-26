package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
)

func main() {
	http.Handle("/", http.FileServer(http.Dir("./web")))

	port, exists := os.LookupEnv("WASHAMBI_CORNPOP_PORT")
	if !exists {
		log.Fatal("environment variable not set: WASHAMBI_CORNPOP_PORT")
	}

	if e := http.ListenAndServe(fmt.Sprintf(":%s", port), nil); e != nil {
		log.Fatalf("serve error: %v", e)
	}
}
