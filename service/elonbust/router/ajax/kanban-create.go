package ajax

import (
	"context"
	"net/http"

	"elonbust/web"
	"washambi-lib/mid"
	"washambi-lib/rpc/client"
	laboof_pb "washambi-lib/rpc/laboof/v1"
)

func KanbanCreate(w http.ResponseWriter, r *http.Request) {
	authCtx := r.Context().Value("auth").(mid.AuthCtx)

	r.ParseForm()
	name := r.Form.Get("name")
	if len(name) < 1 {
		http.Error(w, "name length", http.StatusBadRequest)
		return
	}

	k, e := client.LaboofClient.KanbanCreate(context.TODO(), &laboof_pb.KanbanCreateRequest{
		Name:   name,
		UserId: authCtx.Id,
	})
	if e != nil {
		http.Error(w, "rpc", http.StatusInternalServerError)
		return
	}

	// fmt.Println(k.Kanban)
	// if k.Kanban.UsersKanbans.UserId == authCtx.Id {
	// 	k.Kanban.UsersKanbans.User.Username = "You"
	// }

	web.
		Parser.
		ParsePartial("kanban").
		Execute(w, k.Kanban)
}
