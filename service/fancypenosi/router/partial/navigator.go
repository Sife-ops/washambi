package partial

import (
	"fancypenosi/web"
	"net/http"
	"washambi-env"
)

func Navigator(w http.ResponseWriter, r *http.Request) {
	web.
		Parser.
		ParsePartial("navigator").
		Execute(w, env.WithEnv(map[string]interface{}{
			"authorized": r.Context().Value("authorized"),
		}))
}
