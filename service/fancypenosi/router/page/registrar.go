package page

import (
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
		cornpopUrl, _ := os.LookupEnv("WASHAMBI_CORNPOP_URL")
		bgs := []string{"forest", "city"}

		web.
			Parse(
				"page/registrar.html",
				// "partial/sign-in.html",
				// "partial/sign-up.html",
			).
			Execute(w, map[string]interface{}{
				"registrarAction": aa,
				"styles":          []string{"registrar"},
				"cornpopUrl":      cornpopUrl,
				"bg":              bgs[rand.Intn(len(bgs))],
			})
	}
}
