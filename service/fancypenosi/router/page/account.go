package page

import (
	"net/http"

	"fancypenosi/web"
    "washambi-env"
)

func Account(w http.ResponseWriter, r *http.Request) {
	web.
		ParsePage("page/account.html").
		Execute(w, map[string]interface{}{
			"fancypenosiUrl": env.FancypenosiUrl,
            "cornpopUrl": env.CornpopUrl,
		})
}
