// source:
// static https://github.com/go-chi/chi/blob/master/_examples/fileserver/main.go

package router

import (
	"net/http"
    "os"
    // "log"
    "path/filepath"

	"github.com/go-chi/chi"

	"fancypenosi/router/ajax"
	"fancypenosi/router/page"
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

    wd, _ := os.Getwd()
    r.Mux.Handle("/public/*", http.StripPrefix(
        "/public/",
        http.FileServer(http.Dir(filepath.Join(wd, "/web/public"))),
    ))

	return r
}

