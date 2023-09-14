package mid

import (
	"context"
	"fmt"
	"net/http"

	"github.com/gorilla/securecookie"

	"washambi-lib/env"
)

var Cookies = map[string]*securecookie.SecureCookie{
	"previous": securecookie.New(
		securecookie.GenerateRandomKey(64),
		securecookie.GenerateRandomKey(32),
	),
	"current": securecookie.New(
		securecookie.GenerateRandomKey(64),
		securecookie.GenerateRandomKey(32),
	),
}

// source: context struct map https://stackoverflow.com/a/40380147
type AuthCtx struct {
	Authenticated bool
	Claims        map[string]string
}

// todo: refresh cookie
func AuthCreate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := AuthCtx{
			Authenticated: false,
		}

		if c, e := r.Cookie("a"); e == nil {
			if e = securecookie.DecodeMulti("a", c.Value, &ctx.Claims, Cookies["current"], Cookies["previous"]); e == nil {
				ctx.Authenticated = true
			}
		}

		next.ServeHTTP(w, r.WithContext(context.WithValue(r.Context(), "auth", ctx)))
	})
}

func AuthRedirect(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !r.Context().Value("auth").(AuthCtx).Authenticated {
			if len(r.Header.Get("hx-request")) > 0 {
				w.Header().Add("HX-Trigger", "hx-sign-out")
				return
			}
			http.Redirect(w, r, fmt.Sprintf(
				"%s/sign-in", env.FancypenosiUrl), http.StatusSeeOther,
			)
			return
		}
		next.ServeHTTP(w, r)
	})
}
