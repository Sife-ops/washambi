package partial

import (
	"html/template"
	"net/http"

	"brynhildr/web"
	WashambiWeb "washambi-lib/web"
)

func ViewBookmark(w http.ResponseWriter, r *http.Request) {
	t := template.Must(
		template.
			New("view-bookmark").
			Funcs(WashambiWeb.Funcs).
			ParseFS(web.Fs, "page/home-auth.html"),
	)

	t.Execute(w, nil)
}
