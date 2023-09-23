package partial

import (
	"html/template"
	"log"
	"net/http"

	// "github.com/davecgh/go-spew/spew"
	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"

	bdb "brynhildr/db"
	"brynhildr/web"
	"washambi-lib/db"
	"washambi-lib/mid"
	WashambiWeb "washambi-lib/web"
)

func DomainGet(w http.ResponseWriter, r *http.Request) {
	t := template.Must(
		template.
			New("domain-form").
			Funcs(WashambiWeb.Funcs).
			ParseFS(web.Fs, "partial/view-domain.html"),
	)

	p := chi.URLParam(r, "id")
	if p == "new" {
		t.Execute(w, nil)
		return
	}

	auth := r.Context().Value("auth").(mid.AuthCtx)

	id, e := uuid.Parse(p)
	if e != nil {
		http.Error(w, "uuid", http.StatusBadRequest)
		return
	}

	d, e := bdb.DomainGetOne(db.PgConn, uuid.MustParse(auth.Id()), id)
	if e != nil {
		log.Println(e)
		http.Error(w, "internal", http.StatusInternalServerError)
		return
	}

	t.Execute(w, d)
}
