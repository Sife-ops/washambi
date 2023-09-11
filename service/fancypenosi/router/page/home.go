package page

import (
	"fancypenosi/web"
	"net/http"
	"washambi-lib/env"
)

func Home(w http.ResponseWriter, r *http.Request) {
	web.
		Parser.
		ParsePage("page/home.html").
		Execute(w, env.WithUrls(nil))
}
