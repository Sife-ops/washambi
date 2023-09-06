package main

import (
	"fmt"
	"log"
	"net/http"

    env "washambi-env"
)

func main() {
	http.Handle("/", http.FileServer(http.Dir("./web")))

	if e := http.ListenAndServe(fmt.Sprintf(":%s", env.CornpopPort), nil); e != nil {
		log.Fatalf("serve error: %v", e)
	}
}
