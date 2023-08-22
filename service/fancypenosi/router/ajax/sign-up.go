package ajax

import (
	"html/template"
	"net/http"
)

func (a AjaxRouter) SignUp(w http.ResponseWriter, r *http.Request) {
	t, _ := template.New("").Parse("<div>{{.}}</div>")
	t.Execute(w, "sign up!!!")
}
