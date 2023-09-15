package page

import (
	"html/template"
	"math/rand"
	"net/http"

	"fancypenosi/web"
	"washambi-lib/env"
	WashambiWeb "washambi-lib/web"
)

type RegistrarAction string

const (
	SignUp RegistrarAction = "sign-up"
	SignIn RegistrarAction = "sign-in"
)

func Registrar(ra RegistrarAction) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		bgs := []string{"forest", "city", "scope"}

		t := template.Must(
			template.New("base").ParseFS(WashambiWeb.Fs, "page/template.html"),
		)
		t = template.Must(
			t.ParseFS(web.Fs, "page/registrar.html"),
		)

		t.Execute(w, env.WithUrls(map[string]interface{}{
			"bg":              bgs[rand.Intn(len(bgs))],
			"referer":         r.Header.Get("Referer"),
			"registrarAction": ra,
			"styles":          []string{"/public/style/registrar.css"},
		}))
	}
}
