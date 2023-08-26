// https://benhoyt.com/writings/go-routing/

package router

import (
	"io/fs"
	"net/http"

	"github.com/go-chi/chi"

	"wokejak/web"
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
		Addr:    ":3000",
		Handler: m,
	}

	return s.ListenAndServe()
}
