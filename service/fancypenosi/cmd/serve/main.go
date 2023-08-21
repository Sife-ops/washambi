package main

import (
	"html/template"
	"log"
	"net/http"

	"github.com/go-chi/chi"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	blazerxd_pb "washambi-rpc/blazerxd/v1"
)

////////////////////////

type Ligma struct {
	*chi.Mux
	blazerxd_pb.BlazerxdClient
}

func (l Ligma) Foo(w http.ResponseWriter, r *http.Request) {
	// todo: write
}

func NewLigma(b blazerxd_pb.BlazerxdClient) Ligma {
	l := Ligma{
		chi.NewMux(),
		b,
	}

	l.Mux.Get("/foo", l.Foo)

	return l
}

////////////////////////

type Deez struct {
	*chi.Mux
	blazerxd_pb.BlazerxdClient
}

func (d *Deez) Bar(w http.ResponseWriter, r *http.Request) {
	// todo: write
}

func NewDeez(b blazerxd_pb.BlazerxdClient) Deez {
	d := Deez{
		chi.NewMux(),
		b,
	}

	d.Mux.Mount("/lmao", NewLigma(b))
	d.Mux.Get("/bar", d.Bar)

	return d
}

////////////////////////

type Router struct {
	*chi.Mux
	blazerxd_pb.BlazerxdClient
}

func (ro Router) Index(w http.ResponseWriter, r *http.Request) {
	t, _ := template.New("").Parse("<div>{{.}}</div>")
	t.Execute(w, "yep???")
}

func NewRouter(b blazerxd_pb.BlazerxdClient) Router {
	r := Router{
		chi.NewMux(),
		b,
	}

	// r.Mux.Mount("/lmao", NewLigma(b))
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

	//
	s := http.Server{
		Addr:    ":3000",
		Handler: NewRouter(g),
	}
	// if e := http.ListenAndServe(":3000", NewRouter(g)); e != http.ErrServerClosed {
	if e := s.ListenAndServe(); e != http.ErrServerClosed {
		log.Fatalf("http error: %v", e)
	}
}
