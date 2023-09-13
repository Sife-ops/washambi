package mid

import (
	"fmt"
	"net/http"
	// "washambi-lib/env"
)

func Track(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

        fmt.Println(r.Header.Get("Referer"))

		// origin := r.Header.Get("Origin")
		// for _, v := range env.Urls {
		// 	if v == origin {
		// 		w.Header().Add("Access-Control-Allow-Origin", origin)
		// 		w.Header().Add("Access-Control-Allow-Credentials", "true")
		// 		break
		// 	}
		// }

		next.ServeHTTP(w, r)
	})
}

