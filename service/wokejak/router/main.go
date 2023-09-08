// https://benhoyt.com/writings/go-routing/

package router

import (
	"fmt"
	"github.com/go-chi/chi/v5"
	"io/fs"
	"log"
	"net/http"
	"washambi-env"
	"wokejak/web"
)

func CreateAndServe() error {
	m := chi.NewMux()

	m.Get("/", Root)

	sub, e := fs.Sub(web.Fs, "public")
	if e != nil {
		return e
	}
	m.Handle("/public/*", http.StripPrefix("/public/", http.FileServer(http.FS(sub))))

	s := http.Server{
		Addr:    fmt.Sprintf(":%s", env.WokejakPort),
		Handler: m,
	}

	log.Printf("wokejak %s", env.WokejakUrl)
	return s.ListenAndServe()
}
