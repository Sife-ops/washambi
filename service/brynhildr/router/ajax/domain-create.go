package ajax

import (
	"html/template"
	"log"
	"net/http"

	// . "github.com/go-jet/jet/v2/postgres"
	// "github.com/google/uuid"

	"brynhildr/web"
	"washambi-lib/db"
	nm "washambi-lib/db/nuland/model"
	nt "washambi-lib/db/nuland/table"
	// "washambi-lib/env"
	"washambi-lib/mid"
	// WashambiWeb "washambi-lib/web"
)

func DomainCreate(w http.ResponseWriter, r *http.Request) {
	auth := r.Context().Value("auth").(mid.AuthCtx)

	r.ParseForm()
	name := r.Form.Get("domain-name-input")

	var d []nm.Domain
	if e := nt.Domain.
		INSERT(nt.Domain.UserID, nt.Domain.Name).
		VALUES(auth.Id(), name).
		RETURNING(nt.Domain.AllColumns).
		Query(db.PgConn, &d); e != nil {
		log.Println(e)
	}

	// log.Println(name)
	template.Must(
		template.New("domain-list-item").
			ParseFS(web.Fs, "partial/domain-list-item.html"),
	).Execute(w, d[0])

}
