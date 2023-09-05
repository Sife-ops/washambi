package page

import (
	"log"
	"math/rand"
	"net/http"
	"os"

	"fancypenosi/web"
)

type RegistrarAction string

const (
	SignUp RegistrarAction = "sign-up"
	SignIn RegistrarAction = "sign-in"
)

func Registrar(aa RegistrarAction) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		cornpopUrl, defined := os.LookupEnv("WASHAMBI_CORNPOP_URL")
		if !defined || cornpopUrl == "" {
			log.Fatal("environment variable not set: WASHAMBI_CORNPOP_URL")
		}

		bgs := []string{"forest", "city", "scope"} // todo: cornpop grpc

		web.
			ParsePage("page/registrar.html").
			Execute(w, map[string]interface{}{
				"registrarAction": aa,
				"styles":          []string{"/public/style/registrar.css"},
				"cornpopUrl":      cornpopUrl,
				"bg":              bgs[rand.Intn(len(bgs))],
			})
	}
}
