package page

import (
	"html/template"
	"log"
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

func Home(w http.ResponseWriter, r *http.Request) {
	auth := r.Context().Value("auth").(mid.AuthCtx)

	t := template.Must(
		template.New("base").ParseFS(WashambiWeb.Fs, "page/template.html", "page/nav.html"),
	)

	if !auth.Authenticated {
		t = template.Must(
			t.ParseFS(web.Fs, "page/home-noauth.html"),
		)
		t.Execute(w, env.WithUrls(nil))
		return
	}

	t = template.Must(
		t.ParseFS(web.Fs, "page/home-auth.html", "partial/domain-list-item.html"),
	)

	var dl []nm.Domain
	if e := SELECT(nt.Domain.AllColumns).
		FROM(nt.Domain).
		WHERE(nt.Domain.UserID.EQ(UUID(uuid.MustParse(auth.Id())))).
		Query(db.PgConn, &dl); e != nil {
		log.Println(e)
	}
    log.Println(dl)

	t.Execute(w, env.WithUrls(map[string]interface{}{
		"htmx":       true,
		"domainList": dl,
	}))
}
