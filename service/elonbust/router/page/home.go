package page

import (
	"context"
	"net/http"

	"elonbust/web"
	"washambi-lib/env"
	"washambi-lib/mid"
	"washambi-lib/rpc/client"
	laboof_pb "washambi-lib/rpc/laboof/v1"
)

func Home(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context().Value("auth").(mid.AuthCtx)

	var k []*laboof_pb.Kanban
	if ctx.Authorized {
		kr, e := client.LaboofClient.KanbanList(context.TODO(), &laboof_pb.KanbanListRequest{
			UserId: ctx.Id,
		})
		if e != nil {
			// ???
		}
		k = kr.Kanbans
	}

	web.
		Parser.
		ParsePage("page/home.html", "partial/kanban.html").
		Execute(w, env.WithUrls(map[string]interface{}{
			"authorized": r.Context().Value("auth").(mid.AuthCtx).Authorized,
			"kanbans":    k,
		}))
}
