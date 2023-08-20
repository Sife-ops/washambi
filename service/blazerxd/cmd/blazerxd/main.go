// https://stackoverflow.com/questions/59014404/referencing-a-go-module-that-is-local

package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net"

	// "washambi-rpc/shishamo/v1"
	// nm "blazerxd/sql/nuland/model"
	// nt "blazerxd/sql/nuland/table"
	zm "blazerxd/sql/zoomers/model"
	zt "blazerxd/sql/zoomers/table"
	blazerxd_pb "washambi-rpc/blazerxd/v1"

	// "github.com/davecgh/go-spew/spew"
	. "github.com/go-jet/jet/v2/postgres"
	_ "github.com/jackc/pgx/v5/stdlib"
	"google.golang.org/grpc"
)

type server struct {
	c *sql.DB
	blazerxd_pb.UnimplementedBlazerxdServer
}

func (s *server) Create(ctx context.Context, call *blazerxd_pb.CreateRequest) (*blazerxd_pb.CreateResponse, error) {
	st := SELECT(zt.User.ID, zt.User.Email).FROM(zt.User)
	var u []struct {
		zm.User
	}
	st.Query(s.c, &u)
	// spew.Dump(u)

	return &blazerxd_pb.CreateResponse{
		User: &blazerxd_pb.User{
            Id: u[0].ID.String(),
            Email: u[0].Email,
            Password: u[0].Password,
            // CreatedAt: u[0].CreatedAt, // todo: convert
		},
	}, nil
}

func main() {
	// sql
	cs := fmt.Sprintf("host=%s port=%d dbname=%s user=%s password=%s sslmode=disable",
		"localhost",
		5432,
		"washambi_local",
		"washambi_local",
		"washambi",
	)
	c, e := sql.Open("pgx", cs)
	if e != nil {
		panic(e)
	}
	defer c.Close()

	// rpc
	{
        l, e := net.Listen("tcp", ":50051")
		if e != nil {
			log.Fatalf("listen err: %v", e)
		}

		s := grpc.NewServer()
		// defer s.Stop()
		blazerxd_pb.RegisterBlazerxdServer(s, &server{c: c})

		if e := s.Serve(l); e != nil {
			log.Fatalf("server err: %v", e)
		}
	}

	//
	// scratch
	//

	// {
	// 	var u []struct {
	// 		zm.User
	// 	}
	// 	s := SELECT(zt.User.ID, zt.User.Email).FROM(zt.User)
	// 	s.Query(c, &u)
	// 	fmt.Println(u)
	// }
	//
	// fmt.Println("================")
	//
	// {
	// 	var b []struct {
	// 		nm.Bookmark
	// 	}
	// 	s := SELECT(nt.Bookmark.Description).FROM(nt.Bookmark)
	// 	s.Query(c, &b)
	// 	fmt.Println(b)
	// }
	//
	// fmt.Println("================")
	//
	// {
	// 	s := SELECT(
	// 		zt.User.Email,
	// 		nt.Domain.Name,
	// 	).FROM(
	// 		zt.User.
	// 			INNER_JOIN(
	// 				nt.Domain,
	// 				zt.User.ID.EQ(nt.Domain.UserID),
	// 			),
	// 	).WHERE(
	// 		zt.User.Email.EQ(String("someguy@gmail.com")),
	// 	)
	//
	// 	var r []struct {
	// 		zm.User
	//
	// 		Domains []struct {
	// 			nm.Domain
	// 		}
	// 	}
	//
	// 	s.Query(c, &r)
	// 	spew.Dump(r)
	// }
}
