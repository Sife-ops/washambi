package main

import (
	"fmt"
	"log"
	"net/http"
	"washambi-env"
)

func main() {
	http.Handle("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var originHeader = r.Header["Origin"]
		if len(originHeader) > 0 {
			var origin string
			switch originHeader[0] { // todo: if len > 1?
			case env.ElonbustUrl:
				origin = env.ElonbustUrl
			case env.FancypenosiUrl:
				origin = env.FancypenosiUrl
			}
			if origin != "" {
				w.Header().Add("Access-Control-Allow-Origin", origin)
				w.Header().Add("Access-Control-Allow-Credentials", "true")
			}
		}
		http.FileServer(http.Dir("./web")).ServeHTTP(w, r)
	}))

	log.Printf("cornpop %s", env.CornpopUrl)
	if e := http.ListenAndServe(fmt.Sprintf(":%s", env.CornpopPort), nil); e != nil {
		log.Fatalf("serve error: %v", e)
	}
}
