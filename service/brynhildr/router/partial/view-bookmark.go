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
			New("view").
			Funcs(WashambiWeb.Funcs).
			ParseFS(web.Fs, "partial/view-bookmark.html"),
	)

	t.Execute(w, nil)
}
