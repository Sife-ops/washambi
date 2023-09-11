package page

import (
	"fancypenosi/web"
	"math/rand"
	"net/http"
	"washambi-lib/env"
)

type RegistrarAction string

const (
	SignUp RegistrarAction = "sign-up"
	SignIn RegistrarAction = "sign-in"
)

func Registrar(ra RegistrarAction) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		bgs := []string{"forest", "city", "scope"} // todo: cornpop grpc

		web.
			Parser.
			ParsePage("page/registrar.html").
			Execute(w, env.WithUrls(map[string]interface{}{
				"isRegistrar":     true,
				"registrarAction": ra,
				"styles":          []string{"/public/style/registrar.css"},
				"bg":              bgs[rand.Intn(len(bgs))],
			}))
	}
}
