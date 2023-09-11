package page

import (
	"elonbust/web"
	"net/http"
	"washambi-lib/auth"
	"washambi-lib/env"
)

func Home(w http.ResponseWriter, r *http.Request) {
	web.
		Parser.
		ParsePage("page/home.html").
		Execute(w, env.WithUrls(map[string]interface{}{
			"authorized": r.Context().Value("auth").(auth.Ctx).Authorized,
		}))
}
