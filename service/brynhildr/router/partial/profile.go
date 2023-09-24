package partial

import (
	"html/template"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"

	"brynhildr/web"
	WashambiWeb "washambi-lib/web"
)

func ProfileGet(w http.ResponseWriter, r *http.Request) {
	t := template.Must(
		template.
			New("profile").
			Funcs(WashambiWeb.Funcs).
			ParseFS(web.Fs, "partial/domain.html"),
	)

	p := chi.URLParam(r, "id")
	if p == "new" {
        t.Execute(w, map[string]interface{}{
            "ID": uuid.New().String(),
            "ProfileFields": []map[string]interface{}{
                {
                    "ID": uuid.New().String(),
                },
            },
        })
		return
	}

    http.Error(w, "uuid", http.StatusNotFound)
}

