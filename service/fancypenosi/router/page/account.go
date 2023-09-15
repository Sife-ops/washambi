package page

import (
	"html/template"
	"net/http"

	"fancypenosi/web"
	"washambi-lib/env"
	WashambiWeb "washambi-lib/web"
)

func Account(w http.ResponseWriter, r *http.Request) {
	t := template.Must(
		template.New("base").ParseFS(WashambiWeb.Fs, "page/template.html", "page/nav.html"),
	)
	t = template.Must(
		t.ParseFS(web.Fs, "page/account.html"),
	)

	t.Execute(w, env.WithUrls(nil))
}
