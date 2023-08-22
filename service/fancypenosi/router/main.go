package router

import (
	"github.com/go-chi/chi"

	blazerxd_pb "washambi-rpc/blazerxd/v1"
    "fancypenosi/router/page"
    "fancypenosi/router/ajax"
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

	return r
}

