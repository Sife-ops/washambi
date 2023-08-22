package ajax

import (
	"github.com/go-chi/chi"

	blazerxd_pb "washambi-rpc/blazerxd/v1"
)

type AjaxRouter struct {
	*chi.Mux
	blazerxd_pb.BlazerxdClient
}

func NewAjaxRouter(b blazerxd_pb.BlazerxdClient) AjaxRouter {
	r := AjaxRouter{
		chi.NewMux(),
		b,
	}

	// r.Mux.Get("/sign-up", r.SignUp)
	// r.Mux.Get("/sign-in", r.SignIn)

	return r
}

