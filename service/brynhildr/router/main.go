package router

import (
	"fmt"
	"io/fs"
	"net/http"

	"github.com/go-chi/chi/v5"

	"brynhildr/router/ajax"
	"brynhildr/router/page"
	"brynhildr/router/partial"
	"brynhildr/web"
	"washambi-lib/env"
	"washambi-lib/mid"
)

func Serve() error {
	m := chi.NewMux()

	m.With(mid.AuthCreate).Get("/", page.Home)
	m.With(mid.AuthCreate).Get("/{entity}", page.Home)
	m.With(mid.AuthCreate).Get("/{entity}/{id}", page.Home)

	m.With(mid.AuthCreate, mid.AuthRefresh).Post("/domain-create", partial.DomainCreate)
	m.With(mid.AuthCreate, mid.AuthRefresh).Get("/domain-get/{id}", partial.DomainGet)
	m.With(mid.AuthCreate, mid.AuthRefresh).Get("/view-bookmark", partial.ViewBookmark)
	m.With(mid.AuthCreate, mid.AuthRefresh).Get("/view-domain", partial.ViewDomain)

	m.With(mid.AuthCreate, mid.AuthRefresh).Post("/domain-name-edit", ajax.DomainNameEdit)
	m.With(mid.AuthCreate, mid.AuthRefresh).Post("/domain-tags-edit", ajax.DomainTagsEdit)

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
