package router

import (
	"context"
	"fmt"
	"io/fs"
	"net/http"

	"github.com/go-chi/chi/v5"

	"fancypenosi/router/ajax"
	"fancypenosi/router/page"
	"fancypenosi/router/partial"
	"fancypenosi/web"
	env "washambi-env"
)

// source: https://github.com/go-chi/chi/blob/master/_examples/fileserver/main.go
func serveStatic(m *chi.Mux, s string) error {
	sub, e := fs.Sub(web.Embeds, s)
	if e != nil {
		return e
	}

	m.Handle(
		fmt.Sprintf("/%s/*", s),
		http.StripPrefix(
			fmt.Sprintf("/%s/", s),
			http.FileServer(http.FS(sub)),
		),
	)

	return nil
}

// todo: refresh cookie
// todo: context https://stackoverflow.com/a/40380147
func Auth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		c, e := r.Cookie("id")
		var ctx context.Context
		if e != nil || c.Value == "" {
			// todo: fetch user
			ctx = context.WithValue(r.Context(), "authorized", false)
		} else {
			ctx = context.WithValue(r.Context(), "authorized", true)
			ctx = context.WithValue(ctx, "user_id", c.Value)
		}

		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}

func Redirect(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if v := r.Context().Value("authorized"); v != true {
			// todo: client redirect
			http.SetCookie(w, &http.Cookie{
				Name:     "redirect",
				Value:    r.URL.String(),
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

func Serve() error {
	m := chi.NewMux()

	m.Get("/", page.Home)
	m.Get("/account", page.Account)
	m.Get("/sign-up", page.Registrar(page.SignUp))
	m.Get("/sign-in", page.Registrar(page.SignIn))

	m.Post("/sign-in", ajax.SignIn)
	m.Post("/sign-up", ajax.SignUp)
	m.Post("/sign-out", ajax.SignOut)
	m.Post("/fetch-user", ajax.FetchUser)
	m.Post("/reset-password", ajax.ResetPassword)

	// authorized
	// m.Route("/", func(r chi.Router) {
	//  r.Use(Auth)
	// 	r.Get("/account", page.Account)
	// })

	m.With(Auth).Get("/partial/navigator", partial.Navigator)
	m.With(Auth, Redirect).Get("/account", page.Account)

	if e := serveStatic(m, "public"); e != nil {
		return e
	}

	s := http.Server{
		Addr:    fmt.Sprintf(":%s", env.FancypenosiPort),
		Handler: m,
	}

	return s.ListenAndServe()
}
