package page

import (
	// "html/template"
	"net/http"
    "fancypenosi/web"
)

func (p PageRouter) SignUp(w http.ResponseWriter, r *http.Request) {
	// t, _ := template.New("").Parse("<div>{{.}}</div>")
	// t.Execute(w, "sign up!!!")
    // web.Foo(w)
    web.SignUp.Execute(w, nil)
}
