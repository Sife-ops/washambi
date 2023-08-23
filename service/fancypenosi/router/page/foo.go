package page

import (
	"fancypenosi/web"
	"net/http"
)

func (p *PageRouter) Foo(w http.ResponseWriter, r *http.Request) {
	web.Foo.Execute(w, nil)
}
