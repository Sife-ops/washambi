// source:
// static https://github.com/go-chi/chi/blob/master/_examples/fileserver/main.go

package router

import (
	"errors"
	"fmt"
	"io/fs"
	"net/http"
	"os"

	"github.com/go-chi/chi"

	"fancypenosi/router/ajax"
	"fancypenosi/router/page"
	"fancypenosi/web"
)

func serveStatic(m *chi.Mux, s string) error {
	sub, e := fs.Sub(web.Embed, s)
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

func Serve() error {
	m := chi.NewMux()

	m.Get("/sign-up", page.SignUp)
	m.Post("/sign-up", ajax.SignUp)

	if e := serveStatic(m, "public"); e != nil {
		return e
	}

	p, e := os.LookupEnv("WASHAMBI_FANCYPENOSI_PORT")
	if !e {
		return errors.New("environment variable not set: WASHAMBI_FANCYPENOSI_PORT")
	}

	s := http.Server{
		Addr:    fmt.Sprintf(":%s", p),
		Handler: m,
	}

	return s.ListenAndServe()
}
