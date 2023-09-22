package partial

import (
	"html/template"
	"log"
	"net/http"

	// "github.com/davecgh/go-spew/spew"
	"github.com/go-chi/chi/v5"
	. "github.com/go-jet/jet/v2/postgres"
	"github.com/google/uuid"

	"brynhildr/web"
	"washambi-lib/db"
	nm "washambi-lib/db/nuland/model"
	nt "washambi-lib/db/nuland/table"
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

	var d []struct {
		nm.Domain
		Tags []nm.Tag
	}

	if e := SELECT(nt.Domain.AllColumns, nt.Tag.AllColumns).
		FROM(
			nt.Domain.
				LEFT_JOIN(nt.DomainsTags, nt.DomainsTags.DomainID.EQ(nt.Domain.ID)).
				LEFT_JOIN(nt.Tag, nt.Tag.ID.EQ(nt.DomainsTags.TagID)),
		).
		WHERE(
			nt.Domain.UserID.EQ(UUID(uuid.MustParse(auth.Id()))).
				AND(nt.Domain.ID.EQ(UUID(id))),
		).
		Query(db.PgConn, &d); e != nil {
		log.Println(e)
		http.Error(w, "internal", http.StatusInternalServerError)
		return
	}

	if len(d) < 1 {
		http.Error(w, "not found", http.StatusNotFound)
		return
	}

	t.Execute(w, d[0])
}
