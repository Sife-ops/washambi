// https://benhoyt.com/writings/go-routing/

package router

import (
	"fmt"
	"io/fs"
	"net/http"

	"github.com/go-chi/chi/v5"

	"wokejak/web"
    "washambi-env"
)

func CreateAndServe() error {
	m := chi.NewMux()

	m.Get("/", Root)

	sub, e := fs.Sub(web.Embeds, "public")
	if e != nil {
		return e
	}
	m.Handle(
		"/public/*",
		http.StripPrefix(
			"/public/",
			http.FileServer(http.FS(sub)),
		),
	)

	s := http.Server{
		Addr:    fmt.Sprintf(":%s", env.WokejakPort),
		Handler: m,
	}

	return s.ListenAndServe()
}
