// source:
// static https://github.com/go-chi/chi/blob/master/_examples/fileserver/main.go

package router

import (
	"fmt"
	"io/fs"
	"net/http"

	"github.com/go-chi/chi"

	"fancypenosi/router/ajax"
	"fancypenosi/router/page"
	"fancypenosi/web"
	blazerxd_pb "washambi-rpc/blazerxd/v1"
)

type Router struct {
	*chi.Mux
	blazerxd_pb.BlazerxdClient
}

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

func NewRouter(b blazerxd_pb.BlazerxdClient) (*Router, error) {
	r := Router{
		chi.NewMux(),
		b,
	}

	r.Mux.Mount("/", page.NewPageRouter(b))
	r.Mux.Mount("/ajax", ajax.NewAjaxRouter(b))

	if e := serveStatic(r.Mux, "pkg"); e != nil {
		return nil, e
	}
	if e := serveStatic(r.Mux, "script"); e != nil {
		return nil, e
	}
	if e := serveStatic(r.Mux, "static"); e != nil {
		return nil, e
	}

	return &r, nil
}
