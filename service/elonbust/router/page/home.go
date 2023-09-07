package page

import (
	"net/http"

	"elonbust/web"
	"washambi-env"
)

func Home(w http.ResponseWriter, r *http.Request) {
	web.
		Parser.
		ParsePage("page/home.html").
		Execute(w, map[string]interface{}{
			"fancypenosiUrl": env.FancypenosiUrl,
		})
}
