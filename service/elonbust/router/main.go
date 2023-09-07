package router

import (
	"fmt"
	"github.com/go-chi/chi/v5"
	"net/http"
	"washambi-env"
)

func Serve() error {
	m := chi.NewMux()

	s := http.Server{
		Addr:    fmt.Sprintf(":%s", env.ElonbustPort),
		Handler: m,
	}

	return s.ListenAndServe()
}
