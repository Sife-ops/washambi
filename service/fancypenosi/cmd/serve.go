package main

import (
	"html/template"
	"log"
	"net/http"

	"github.com/go-chi/chi"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	blazerxd_pb "washambi-rpc/blazerxd/v1"
    "fancypenosi/web"
)

////////////////////////

type Router struct {
	*chi.Mux
	blazerxd_pb.BlazerxdClient
}

////////////////////////

func (ro Router) FooIndex(w http.ResponseWriter, r *http.Request) {
	// t, _ := template.New("").Parse("<div>{{.}}</div>")
	// t.Execute(w, "foo!!!")
    web.Foo(w)
}

func NewFooRouter(b blazerxd_pb.BlazerxdClient) Router {
    r := Router{
        chi.NewMux(),
        b,
    }

    r.Mux.Get("/", r.FooIndex)

    return r
}

////////////////////////

func (ro Router) Index(w http.ResponseWriter, r *http.Request) {
	t, _ := template.New("").Parse("<div>{{.}}</div>")
	t.Execute(w, "index!!!")
}

func NewRouter(b blazerxd_pb.BlazerxdClient) Router {
	r := Router{
		chi.NewMux(),
		b,
	}

	r.Mux.Mount("/foo", NewFooRouter(b))
	r.Mux.Get("/", r.Index)

	return r
}

////////////////////////

func main() {
	// rpc
	c, e := grpc.Dial("localhost:50051", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if e != nil {
		// return nil, e
		log.Fatalf("dial err: %v", e)
	}
	g := blazerxd_pb.NewBlazerxdClient(c)

	// http
	s := http.Server{
		Addr:    ":3000",
		Handler: NewRouter(g),
	}
	if e := s.ListenAndServe(); e != http.ErrServerClosed {
		log.Fatalf("http error: %v", e)
	}
}
