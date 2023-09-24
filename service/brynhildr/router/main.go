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
	m.With(mid.AuthCreate, mid.AuthRefresh).Get("/{entity}", page.Home)
	m.With(mid.AuthCreate, mid.AuthRefresh).Get("/{entity}/{id}", page.Home)

	m.With(mid.AuthCreate, mid.AuthRefresh).Get("/partial/domain/{id}", partial.DomainGet)
	m.With(mid.AuthCreate, mid.AuthRefresh).Get("/partial/profile/{id}", partial.ProfileGet)
	m.With(mid.AuthCreate, mid.AuthRefresh).Get("/partial/view/bookmark", partial.ViewBookmark)
	m.With(mid.AuthCreate, mid.AuthRefresh).Get("/partial/view/domain", partial.DomainView)
	m.With(mid.AuthCreate, mid.AuthRefresh).Post("/partial/domain", partial.DomainCreate)

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
