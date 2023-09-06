package page

import (
	"math/rand"
	"net/http"

	"fancypenosi/web"
	"washambi-env"
)

type RegistrarAction string

const (
	SignUp RegistrarAction = "sign-up"
	SignIn RegistrarAction = "sign-in"
)

func Registrar(aa RegistrarAction) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		bgs := []string{"forest", "city", "scope"} // todo: cornpop grpc

		web.
			ParsePage("page/registrar.html").
			Execute(w, map[string]interface{}{
				"registrarAction": aa,
				"styles":          []string{"/public/style/registrar.css"},
				"cornpopUrl":      env.CornpopUrl,
				"bg":              bgs[rand.Intn(len(bgs))],
			})
	}
}
