package partial

import (
	"html/template"
	"net/http"

	. "github.com/go-jet/jet/v2/postgres"
	"github.com/google/uuid"

	"brynhildr/web"
	"washambi-lib/db"
	nm "washambi-lib/db/nuland/model"
	nt "washambi-lib/db/nuland/table"
	"washambi-lib/env"
	"washambi-lib/mid"
	WashambiWeb "washambi-lib/web"
)

func ViewDomain(w http.ResponseWriter, r *http.Request) {
	auth := r.Context().Value("auth").(mid.AuthCtx)

	var dl []nm.Domain
	if e := SELECT(nt.Domain.AllColumns).
		FROM(nt.Domain).
		WHERE(nt.Domain.UserID.EQ(UUID(uuid.MustParse(auth.Id())))).
		Query(db.PgConn, &dl); e != nil {
		http.Error(w, "internal", http.StatusInternalServerError)
		return
	}

	template.Must(
		template.
			New("view").
			Funcs(WashambiWeb.Funcs).
			ParseFS(web.Fs, "partial/view-domain.html"),
	).Execute(w, env.WithUrls(map[string]interface{}{
		"domainList": dl,
	}))
}
