package router

import (
	"fmt"
	"io/fs"
	"net/http"

	"github.com/go-chi/chi/v5"

	"elonbust/router/ajax"
	"elonbust/router/page"
	"elonbust/web"
	washambiAjax "washambi-lib/ajax"
	"washambi-lib/env"
	"washambi-lib/mid"
)

func Serve() error {
	m := chi.NewMux()

	m.With(mid.AuthCreate).Get("/", page.Home)
	m.With(mid.AuthCreate, mid.AuthRefresh).Get("/kanban/{id}", page.Kanban)

	m.With(mid.AuthCreate, mid.AuthRefresh).Post("/kanban-create", ajax.KanbanCreate)
	m.Post("/sign-out", washambiAjax.SignOut)

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
