// source:
// static https://github.com/go-chi/chi/blob/master/_examples/fileserver/main.go

package router

import (
	// "io/fs"
	// "net/http"

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

func NewRouter(b blazerxd_pb.BlazerxdClient) Router {
	r := Router{
		chi.NewMux(),
		b,
	}

	r.Mux.Mount("/", page.NewPageRouter(b))
	r.Mux.Mount("/ajax", ajax.NewAjaxRouter(b))

    web.ServeStatic(r.Mux)

	return r
}
