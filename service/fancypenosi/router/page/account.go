package page

import (
	"fancypenosi/web"
	"net/http"
    "washambi-lib/env"
)

func Account(w http.ResponseWriter, r *http.Request) {
	web.
		Parser.
		ParsePage("page/account.html").
		Execute(w, env.WithUrls(nil))
}
