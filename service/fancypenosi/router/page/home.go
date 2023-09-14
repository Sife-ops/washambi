package page

import (
	"net/http"

	"fancypenosi/web"
	"washambi-lib/env"
)

func Home(w http.ResponseWriter, r *http.Request) {
	web.
		Parser.
		ParsePage("page/home.html").
		Execute(w, env.WithUrls(nil))
}
