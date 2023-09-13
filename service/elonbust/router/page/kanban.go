package page

import (
	// "context"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"

	"elonbust/web"
	"washambi-lib/env"
	"washambi-lib/mid"
	// "washambi-lib/rpc/client"
	// laboof_pb "washambi-lib/rpc/laboof/v1"
)

func Kanban(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context().Value("auth").(mid.AuthCtx)

	p := chi.URLParam(r, "id")
	fmt.Println(p)

	// var k []*laboof_pb.Kanban
	// if ctx.Authorized {
	// 	kr, e := client.LaboofClient.KanbanList(context.TODO(), &laboof_pb.KanbanListRequest{
	// 		UserId: ctx.Id,
	// 	})
	// 	if e != nil {
	// 		// ???
	// 	}
	// 	k = kr.Kanbans
	// }

	web.
		Parser.
		ParsePage("page/kanban.html").
		Execute(w, env.WithUrls(map[string]interface{}{
			"ctx": ctx,
		}))
}
