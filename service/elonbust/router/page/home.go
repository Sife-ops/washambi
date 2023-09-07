package page

import (
	"net/http"

	"elonbust/web"
)

func Home(w http.ResponseWriter, r *http.Request) {
	web.
		Parser.
		ParsePage("page/home.html").
		Execute(w, nil)
}

