package ajax

import (
	// "html/template"
	// "log"
	"net/http"
	// "strings"
	// "context"
	// blazerxd_pb "washambi-rpc/blazerxd/v1"
)

func (a *AjaxRouter) SignUp(w http.ResponseWriter, r *http.Request) {
	if e := r.ParseForm(); e != nil {
		http.Error(w, "todo", 400)
		return
	}

	// todo: validate

	// _, e := a.BlazerxdClient.Create(context.TODO(), &blazerxd_pb.CreateRequest{
	// 	Email:    r.FormValue("email"),
	// 	Password: r.FormValue("password"),
	// })
	// if e != nil {
	// 	if strings.Contains(e.Error(), "AlreadyExists") {
	// 		http.Error(w, "todo", 400)
	// 	} else {
	// 		http.Error(w, "todo", 400)
	// 	}
	// }

	// log.Println(r.ParseForm())
	// log.Println(r.FormValue("email"))

	w.Header().Add("lmao", "ok")
	http.Error(w, "todo", 400)

	// log.Println(r.PostForm)
	// t, _ := template.New("").Parse("<div>{{.}}</div>")
	// t.Execute(w, "sign up!!!")
}
