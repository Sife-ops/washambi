package partial

import (
	"fancypenosi/web"
	"net/http"
	"washambi-lib/auth"
	"washambi-lib/env"
)

func Navigator(w http.ResponseWriter, r *http.Request) {
	web.
		Parser.
		ParsePartial("navigator").
		Execute(w, env.WithUrls(map[string]interface{}{
			"authorized": r.Context().Value("auth").(auth.Ctx).Authorized,
		}))
}
