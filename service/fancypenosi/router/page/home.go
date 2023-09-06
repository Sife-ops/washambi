package page

import (
	"net/http"

	"fancypenosi/web"
    "washambi-env"
)

func Home(w http.ResponseWriter, r *http.Request) {
	web.
		ParsePage("page/home.html").
		Execute(w, map[string]interface{}{
			"fancypenosiUrl": env.FancypenosiUrl,
		})
}
