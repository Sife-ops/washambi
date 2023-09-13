package mid

import (
	"context"
	"fmt"
	"net/http"

	"washambi-lib/env"
)

// source: context struct map https://stackoverflow.com/a/40380147
type AuthCtx struct {
	Authorized bool
	Id         string
}

// todo: refresh cookie
func AuthCreate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := AuthCtx{
			Authorized: false,
		}

		c, e := r.Cookie("id")

		if e == nil && c.Value != "" {
			ctx.Authorized = true
			ctx.Id = c.Value
		}

		next.ServeHTTP(w, r.WithContext(context.WithValue(r.Context(), "auth", ctx)))
	})
}

func AuthRedirect(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !r.Context().Value("auth").(AuthCtx).Authorized {
			http.Redirect(w, r, fmt.Sprintf("%s/sign-in", env.FancypenosiUrl), http.StatusSeeOther)
			return
		}

		next.ServeHTTP(w, r)
	})
}
