// https://benhoyt.com/writings/go-routing/

package router

import (
	"errors"
	"fmt"
	"io/fs"
	"net/http"
	"os"

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

	p, b := os.LookupEnv("WASHAMBI_WOKEJAK_PORT")
	if !b {
		return errors.New("environment variable not set: WASHAMBI_WOKEJAK_PORT")
	}

	s := http.Server{
		Addr:    fmt.Sprintf(":%s", p),
		Handler: m,
	}

	return s.ListenAndServe()
}
