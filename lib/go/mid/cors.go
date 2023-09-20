package mid

import (
	"net/http"
	"washambi-lib/env"
)

func Cors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")

		for _, v := range env.Urls {
			if v == origin {
				w.Header().Add("Access-Control-Allow-Origin", origin)
				w.Header().Add("Access-Control-Allow-Credentials", "true")
				break
			}
		}

		next.ServeHTTP(w, r)
	})
}
