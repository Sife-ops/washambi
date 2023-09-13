package ajax

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"elonbust/web"
	"washambi-lib/mid"
	"washambi-lib/rpc/client"
	laboof_pb "washambi-lib/rpc/laboof/v1"
)

type kanbanCreateReq struct {
	Name string
}

func KanbanCreate(w http.ResponseWriter, r *http.Request) {
	authCtx := r.Context().Value("auth").(mid.AuthCtx)

	var b kanbanCreateReq
	if e := json.NewDecoder(r.Body).Decode(&b); e != nil {
		//
	}

	a, e := client.LaboofClient.KanbanCreate(context.TODO(), &laboof_pb.KanbanCreateRequest{
		Name:   b.Name,
		UserId: authCtx.Id,
	})
	if e != nil {
		fmt.Println(e)
	}

	// a.Kanban.CreatedAt.AsTime()

	web.
		Parser.
		ParsePartial("kanban").
		Execute(w, a.Kanban)
}
