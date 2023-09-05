// source:
// static https://github.com/go-chi/chi/blob/master/_examples/fileserver/main.go

package router

import (
	"context"
	"errors"
	"fmt"
	"io/fs"
	"net/http"
	"os"

	"github.com/go-chi/chi"

	"fancypenosi/router/ajax"
	"fancypenosi/router/page"
	"fancypenosi/router/partial"
	"fancypenosi/web"
)

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
func Auth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		c, e := r.Cookie("id")
		if e == nil {
			// todo: fetch user
			ctx := context.WithValue(r.Context(), "user_id", c.Value)
			r = r.WithContext(ctx)
		}
		next.ServeHTTP(w, r)
	})
}

func Redirect(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if v := r.Context().Value("user_id"); v == nil {
			// todo: client redirect
			http.Redirect(w, r, "/sign-in", http.StatusSeeOther)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func Serve() error {
	m := chi.NewMux()

	m.Get("/account", page.Account)
	m.Get("/sign-up", page.Registrar(page.SignUp))
	m.Get("/sign-in", page.Registrar(page.SignIn))

	m.Post("/sign-in", ajax.SignIn)
	m.Post("/sign-up", ajax.SignUp)

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

	p, e := os.LookupEnv("WASHAMBI_FANCYPENOSI_PORT")
	if !e || p == "" {
		return errors.New("environment variable not set: WASHAMBI_FANCYPENOSI_PORT")
	}

	s := http.Server{
		Addr:    fmt.Sprintf(":%s", p),
		Handler: m,
	}

	return s.ListenAndServe()
}
