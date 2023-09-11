package router

import (
	"bcoli/auth"
	"elonbust/router/page"
	"elonbust/web"
	"fmt"
	"github.com/go-chi/chi/v5"
	"io/fs"
	"net/http"
	env "washambi-env"
)

func Serve() error {
	m := chi.NewMux()

	m.With(auth.Create).Get("/", page.Home)
	m.Post("/sign-out", auth.SignOut)

	sub, e := fs.Sub(web.Fs, "public")
	if e != nil {
		return e
	}
	m.Handle("/public/*", http.StripPrefix("/public/", http.FileServer(http.FS(sub))))

	s := http.Server{
		Addr:    fmt.Sprintf(":%s", env.ElonbustPort),
		Handler: m,
	}

	return s.ListenAndServe()
}
