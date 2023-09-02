package page

import (
	"math/rand"
	"net/http"
	"os"

	"fancypenosi/web"
)

type AccountAction string

const (
	SignUp AccountAction = "sign-up"
	SignIn AccountAction = "sign-in"
)

func Account(aa AccountAction) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		cornpopUrl, _ := os.LookupEnv("WASHAMBI_CORNPOP_URL")
		bgs := []string{"forest", "city"}

		web.
			Parse(
				"page/account.html",
				// "partial/sign-in.html",
				// "partial/sign-up.html",
			).
			Execute(w, map[string]interface{}{
				"accountAction": aa,
				"styles":        []string{"sign-up"},
				"cornpopUrl":    cornpopUrl,
				"bg":            bgs[rand.Intn(len(bgs))],
			})
	}
}
