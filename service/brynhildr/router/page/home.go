package page

import (
	"html/template"
	"net/http"

	"brynhildr/web"
	"washambi-lib/env"
	WashambiWeb "washambi-lib/web"
)

func Home(w http.ResponseWriter, r *http.Request) {
	t := template.Must(
		template.New("base").ParseFS(WashambiWeb.Fs, "page/template.html", "page/nav.html"),
	)
	t = template.Must(
		t.ParseFS(web.Fs, "page/home.html"),
	)

	t.Execute(w, env.WithUrls(nil))
}
