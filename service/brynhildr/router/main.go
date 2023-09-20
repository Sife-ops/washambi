package router

import (
	"fmt"
	"io/fs"
	"net/http"

	"github.com/go-chi/chi/v5"

	"brynhildr/router/partial"
	"brynhildr/router/page"
	"brynhildr/web"
	"washambi-lib/env"
	"washambi-lib/mid"
)

func Serve() error {
	m := chi.NewMux()

	m.With(mid.AuthCreate).Get("/", page.Home)

	m.With(mid.AuthCreate, mid.AuthRefresh).Post("/domain-create", partial.DomainCreate)
	m.With(mid.AuthCreate, mid.AuthRefresh).Get("/domain-get/{id}", partial.DomainGet)

	sub, e := fs.Sub(web.Fs, "public")
	if e != nil {
		return e
	}
	m.Handle("/public/*", http.StripPrefix("/public/", http.FileServer(http.FS(sub))))

	s := http.Server{
		Addr:    fmt.Sprintf(":%s", env.BrynhildrPort),
		Handler: m,
	}

	return s.ListenAndServe()
}
