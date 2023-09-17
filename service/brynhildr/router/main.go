package router

import (
	"fmt"
	"io/fs"
	"net/http"

	"github.com/go-chi/chi/v5"

	"brynhildr/router/page"
	"brynhildr/web"
	"washambi-lib/env"
	"washambi-lib/mid"
)

func Serve() error {
	m := chi.NewMux()

	m.Get("/", page.Home)

	sub, e := fs.Sub(web.Fs, "public")
	if e != nil {
		return e
	}
	m.With(mid.Cors).Handle("/public/*", http.StripPrefix("/public/", http.FileServer(http.FS(sub))))

	s := http.Server{
		Addr:    fmt.Sprintf(":%s", env.BrynhildrPort),
		Handler: m,
	}

	return s.ListenAndServe()
}
