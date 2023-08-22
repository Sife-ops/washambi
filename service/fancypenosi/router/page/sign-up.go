package page

import (
	"html/template"
	"net/http"
)

func (p PageRouter) SignUp(w http.ResponseWriter, r *http.Request) {
	t, _ := template.New("").Parse("<div>{{.}}</div>")
	t.Execute(w, "sign up!!!")
}
