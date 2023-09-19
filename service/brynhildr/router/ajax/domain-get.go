package ajax

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
	auth := r.Context().Value("auth").(mid.AuthCtx)
	id := chi.URLParam(r, "id")

	var d []struct {
		nm.Domain
		Tags []nm.Tag
	}

	if e := SELECT(nt.Domain.AllColumns, nt.Tag.AllColumns).
		FROM(
			nt.Domain.
				LEFT_JOIN(
					nt.DomainsTags,
					nt.DomainsTags.DomainID.EQ(nt.Domain.ID),
				).
				LEFT_JOIN(
					nt.Tag,
					nt.Tag.ID.EQ(nt.DomainsTags.TagID),
				),
		).
		WHERE(
			nt.Domain.UserID.EQ(UUID(uuid.MustParse(auth.Id()))).
				AND(nt.Domain.ID.EQ(UUID(uuid.MustParse(id)))),
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

	template.Must(
		template.
			New("domain-form").
			Funcs(WashambiWeb.Funcs).
			ParseFS(web.Fs, "page/home-auth.html"),
	).Execute(w, d[0])
}
