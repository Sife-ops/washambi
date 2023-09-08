package main

import (
	"fmt"
	"log"
	"net/http"
	"washambi-env"
)

func main() {
	http.Handle("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        originHeader := r.Header.Get("Origin")
		var origin string

		for _, v := range env.Urls {
			if v == originHeader {
				origin = v.(string)
			}
		}

		if origin != "" {
			w.Header().Add("Access-Control-Allow-Origin", origin)
			w.Header().Add("Access-Control-Allow-Credentials", "true")
		}

		http.FileServer(http.Dir("./web")).ServeHTTP(w, r)
	}))

	log.Printf("cornpop %s", env.CornpopUrl)
	if e := http.ListenAndServe(fmt.Sprintf(":%s", env.CornpopPort), nil); e != nil {
		log.Fatalf("serve error: %v", e)
	}
}
