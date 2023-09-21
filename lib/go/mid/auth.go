package mid

import (
	"context"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/securecookie"

	"washambi-lib/db"
	"washambi-lib/env"
)

// source: context struct map https://stackoverflow.com/a/40380147
type AuthCtx struct {
	Authenticated bool
	Claims        map[string]string
}

func (a *AuthCtx) Id() string {
	return a.Claims["id"]
}

func (a *AuthCtx) Username() string {
	return a.Claims["username"]
}

type AuthClaims struct {
	Id       string
	Username string
}

func AuthCookie(w http.ResponseWriter, u AuthClaims) {
	c, e := db.CookieKeysLatest()
	if e != nil {
		http.Error(w, "cookie", http.StatusInternalServerError)
		return
	}

	enc, e := securecookie.EncodeMulti("a", map[string]string{
		"id":       u.Id,
		"username": u.Username,
	}, c)
	if e != nil {
		http.Error(w, "cookie", http.StatusInternalServerError)
		return
	}

	maxage, e := strconv.Atoi(env.FancypenosiCookieMaxage)
	if e != nil {
		http.Error(w, "cookie", http.StatusInternalServerError)
		return
	}
	http.SetCookie(w, &http.Cookie{
		Name:     "a",
		Value:    enc,
		Path:     "/",
		Secure:   true,
		HttpOnly: true,
		MaxAge:   maxage,
		SameSite: http.SameSiteStrictMode,
	})
}

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

func AuthRefresh(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context().Value("auth").(AuthCtx)

		if !ctx.Authenticated {
            switch {
            case len(r.Header.Get("hx-request")) > 0:
				w.Header().Add("HX-Trigger", "sign-out")
				return
            case len(r.Header.Get("partial-request")) > 0:
				w.Header().Add("partial-trigger", "sign-out")
				return
            }

			http.Redirect(w, r, fmt.Sprintf(
				"%s/sign-in", env.FancypenosiUrl), http.StatusSeeOther,
			)

			return
		}

		AuthCookie(w, AuthClaims{
			Id:       ctx.Id(),
			Username: ctx.Username(),
		})

		next.ServeHTTP(w, r)
	})
}
