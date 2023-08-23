// source:
// static https://github.com/go-chi/chi/blob/master/_examples/fileserver/main.go

package router

import (
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

func NewRouter(b blazerxd_pb.BlazerxdClient) (*Router, error) {
	r := Router{
		chi.NewMux(),
		b,
	}

	r.Mux.Mount("/", page.NewPageRouter(b))
	r.Mux.Mount("/ajax", ajax.NewAjaxRouter(b))

	{
		sub, e := fs.Sub(web.Embed, "static")
		if e != nil {
			return nil, e
		}
		r.Mux.Handle(
			"/static/*",
			http.StripPrefix(
				"/static/",
				http.FileServer(http.FS(sub)),
			),
		)
	}

	{
		sub, e := fs.Sub(web.Embed, "script")
		if e != nil {
			return nil, e
		}
		r.Mux.Handle(
			"/script/*",
			http.StripPrefix(
				"/script/",
				http.FileServer(http.FS(sub)),
			),
		)
	}

	return &r, nil
}
