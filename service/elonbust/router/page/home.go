package page

import (
	"elonbust/web"
	"net/http"
	"washambi-env"
)

func Home(w http.ResponseWriter, r *http.Request) {
	web.
		Parser.
		ParsePage("page/home.html").
		Execute(w, map[string]interface{}{
			"fancypenosiUrl": env.FancypenosiUrl,
            "cornpopUrl": env.CornpopUrl,
		})
}
