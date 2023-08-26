package page

import (
	"math/rand"
	"net/http"
	"os"

	"fancypenosi/web"
)

func (p *PageRouter) SignUp(w http.ResponseWriter, r *http.Request) {
	cornpopUrl, _ := os.LookupEnv("WASHAMBI_CORNPOP_URL")
	bgs := []string{"forest", "city"}

	web.SignUp.Execute(w, map[string]interface{}{
		"styles":     []string{"sign-up"},
		"cornpopUrl": cornpopUrl,
		"bg":         bgs[rand.Intn(len(bgs))],
	})
}
