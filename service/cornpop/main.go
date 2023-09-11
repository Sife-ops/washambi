package main

import (
	"fmt"
	"log"
	"net/http"
	"washambi-lib/env"
    "washambi-lib/mid"
)

func main() {
	http.Handle("/", mid.Cors(http.FileServer(http.Dir("./web"))))

	log.Printf("cornpop %s", env.CornpopUrl)
	if e := http.ListenAndServe(fmt.Sprintf(":%s", env.CornpopPort), nil); e != nil {
		log.Fatalf("serve error: %v", e)
	}
}
