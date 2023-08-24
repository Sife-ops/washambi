package page

import (
	"fancypenosi/web"
	"net/http"
)

func (p *PageRouter) SignUp(w http.ResponseWriter, r *http.Request) {
	web.SignUp.Execute(w, map[string]interface{}{
		"styles": []string{"sign-up"},
	})
}
