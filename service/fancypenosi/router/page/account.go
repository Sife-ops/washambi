package page

import (
	"fmt"
	"net/http"

	"fancypenosi/web"
    "washambi-lib/env"
	"washambi-lib/mid"
)

func Account(w http.ResponseWriter, r *http.Request) {
    a := r.Context().Value("auth").(mid.AuthCtx)
    fmt.Println(a.Claims)

	web.
		Parser.
		ParsePage("page/account.html").
		Execute(w, env.WithUrls(nil))
}
