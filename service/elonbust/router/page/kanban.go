package page

import (
	"context"
	"net/http"

	"github.com/go-chi/chi/v5"

	"elonbust/web"
	"washambi-lib/env"
	"washambi-lib/mid"
	"washambi-lib/rpc/client"
	laboof_pb "washambi-lib/rpc/laboof/v1"
)

func Kanban(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context().Value("auth").(mid.AuthCtx)

	p := chi.URLParam(r, "id")

	k, e := client.LaboofClient.KanbanGet(context.TODO(), &laboof_pb.KanbanGetRequest{
		KanbanId: p,
	})
	if e != nil {
		http.Error(w, "rpc", http.StatusInternalServerError)
		return
	}

	web.
		Parser.
		ParsePage("page/kanban.html").
		Execute(w, env.WithUrls(map[string]interface{}{
			"ctx":    ctx,
			"kanban": k.Kanban,
		}))
}
