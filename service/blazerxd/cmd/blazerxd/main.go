// https://stackoverflow.com/questions/59014404/referencing-a-go-module-that-is-local

package main

import (
	// "context"
	"database/sql"
	"fmt"
	// "github.com/jackc/pgx/v5"
	// "washambi-rpc/shishamo/v1"
	nm "blazerxd/sql/nuland/model"
	nt "blazerxd/sql/nuland/table"
	zm "blazerxd/sql/zoomers/model"
	zt "blazerxd/sql/zoomers/table"
	"github.com/davecgh/go-spew/spew"
	. "github.com/go-jet/jet/v2/postgres"
	_ "github.com/lib/pq"
)

func main() {
	// sql
	// urlExample := "postgres://username:password@localhost:5432/database_name"
	cs := fmt.Sprintf("host=%s port=%d dbname=%s user=%s password=%s sslmode=disable",
		"localhost",
		5432,
		"washambi_local",
		"washambi_local",
		"washambi",
	)

	c, e := sql.Open("postgres", cs)
	// c, e := pgx.Connect(context.Background(), "postgres://washambi_local:washambi@localhost:5432/washambi_local")

	if e != nil {
		panic(e)
	}

	defer c.Close()
	// defer c.Close(context.Background())

	//
	// scratch
	//
	{
		var u []struct {
			zm.User
		}
		s := SELECT(zt.User.ID, zt.User.Email).FROM(zt.User)
		s.Query(c, &u)
		fmt.Println(u)
	}

	fmt.Println("================")

	{
		var b []struct {
			nm.Bookmark
		}
		s := SELECT(nt.Bookmark.Description).FROM(nt.Bookmark)
		s.Query(c, &b)
		fmt.Println(b)
	}

	fmt.Println("================")

	{
		s := SELECT(
			zt.User.Email,
			nt.Domain.Name,
		).FROM(
			zt.User.
				INNER_JOIN(
					nt.Domain,
					zt.User.ID.EQ(nt.Domain.UserID),
				),
		).WHERE(
			zt.User.Email.EQ(String("someguy@gmail.com")),
		)

		var r []struct {
			zm.User

			Domains []struct {
				nm.Domain
			}
		}

		s.Query(c, &r)
		spew.Dump(r)
	}
}
