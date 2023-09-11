package router

import (
	"fmt"
	"io/fs"
	"net/http"

	"github.com/go-chi/chi/v5"

	"fancypenosi/router/ajax"
	"fancypenosi/router/page"
	"fancypenosi/router/partial"
	"fancypenosi/web"
	"washambi-lib/auth"
	"washambi-lib/env"
)

func Serve() error {
	m := chi.NewMux()

	m.Get("/", page.Home)
	m.Get("/account", page.Account)
	m.Get("/sign-up", page.Registrar(page.SignUp))
	m.Get("/sign-in", page.Registrar(page.SignIn))

	m.Post("/sign-in", ajax.SignIn)
	m.Post("/sign-up", ajax.SignUp)
	m.Post("/sign-out", auth.SignOut)
	m.Post("/fetch-user", ajax.FetchUser)
	m.Post("/reset-password", ajax.ResetPassword)

	m.With(env.Cors, auth.Create).Get("/partial/navigator", partial.Navigator)
	m.With(auth.Create, auth.Redirect).Get("/account", page.Account)

	sub, e := fs.Sub(web.Fs, "public")
	if e != nil {
		return e
	}
	m.With(env.Cors).Handle("/public/*", http.StripPrefix("/public/", http.FileServer(http.FS(sub))))

	s := http.Server{
		Addr:    fmt.Sprintf(":%s", env.FancypenosiPort),
		Handler: m,
	}

	return s.ListenAndServe()
}
