package partial

import (
	"net/http"

	"fancypenosi/web"
)

func Navigator(w http.ResponseWriter, r *http.Request) {
	web.
		ParsePartial("navigator").
		Execute(w, map[string]interface{}{
			"authorized": r.Context().Value("authorized"),
		})
}
