package auth

import (
	"context"
	"net/http"
)

// source: context struct map https://stackoverflow.com/a/40380147
type Ctx struct {
	Authorized bool
	Id         string
}

// todo: refresh cookie
func Create(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := Ctx{
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

func Redirect(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !r.Context().Value("auth").(Ctx).Authorized {
			// todo: client redirect
			http.SetCookie(w, &http.Cookie{
				Name:     "redirect",
				Value:    r.Header.Get("Referer"),
				Secure:   true,
				HttpOnly: false,
				SameSite: http.SameSiteStrictMode,
			})

			http.Redirect(w, r, "/sign-in", http.StatusSeeOther)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func SignOut(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, &http.Cookie{
		Name:     "id",
		Value:    "",
		Secure:   true,
		HttpOnly: true,
		SameSite: http.SameSiteStrictMode,
	})
}
