package mid

import (
	"context"
	"fmt"
	"net/http"

	"github.com/gorilla/securecookie"

	"washambi-lib/db"
	"washambi-lib/env"
)

// source: context struct map https://stackoverflow.com/a/40380147
type AuthCtx struct {
	Authenticated bool
	Claims        map[string]string
}

func (a *AuthCtx) id() string {
	return a.Claims["id"]
}

func (a *AuthCtx) username() string {
	return a.Claims["username"]
}

// todo: refresh cookie
func AuthCreate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := AuthCtx{
			Authenticated: false,
		}

		ck, e := db.CookieKeys()
		if e != nil {
			http.Error(w, "cookie", http.StatusInternalServerError)
			return
		}

		if c, e := r.Cookie("a"); e == nil {
			if e = securecookie.DecodeMulti("a", c.Value, &ctx.Claims, ck[0], ck[1], ck[2]); e == nil {
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
