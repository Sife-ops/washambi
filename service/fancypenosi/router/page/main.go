package page

import (
	"github.com/go-chi/chi"

	blazerxd_pb "washambi-rpc/blazerxd/v1"
)

type PageRouter struct {
	*chi.Mux
	blazerxd_pb.BlazerxdClient
}

func NewPageRouter(b blazerxd_pb.BlazerxdClient) *PageRouter {
	r := PageRouter{
		chi.NewMux(),
		b,
	}

	r.Mux.Get("/sign-up", r.SignUp)
	// r.Mux.Get("/sign-in", r.SignIn)

	return &r
}
