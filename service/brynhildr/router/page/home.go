package page

import (
	"html/template"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
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
	t := template.Must(
		template.New("base").
			Funcs(WashambiWeb.Funcs).
			ParseFS(WashambiWeb.Fs, "page/template.html", "page/nav.html"),
	)

	auth := r.Context().Value("auth").(mid.AuthCtx)
	if !auth.Authenticated {
		t = template.Must(
			t.ParseFS(web.Fs, "page/home-noauth.html"),
		)
		t.Execute(w, env.WithUrls(nil))
		return
	}

	entity := chi.URLParam(r, "entity")
	id, idErr := uuid.Parse(chi.URLParam(r, "id"))

	t = template.Must(t.ParseFS(web.Fs, "page/home-auth.html"))

	switch entity {
	case "bookmark":
		template.Must(t.ParseFS(web.Fs, "partial/view-bookmark.html")).
			Execute(w, env.WithUrls(nil))
		break
	case "domain":
		fallthrough
	default:
		var tl []nm.Tag
		if e := SELECT(nt.Tag.AllColumns).
			FROM(nt.Tag).
			WHERE(nt.Tag.UserID.EQ(UUID(uuid.MustParse(auth.Id())))).
			Query(db.PgConn, &tl); e != nil {
			http.Error(w, "internal", http.StatusInternalServerError)
			return
		}

		var dl []nm.Domain
		if e := SELECT(nt.Domain.AllColumns).
			FROM(nt.Domain).
			WHERE(nt.Domain.UserID.EQ(UUID(uuid.MustParse(auth.Id())))).
			Query(db.PgConn, &dl); e != nil {
			http.Error(w, "internal", http.StatusInternalServerError)
			return
		}

		data := map[string]interface{}{
			"tagList":    tl,
            "view": map[string]interface{}{
                "domainList": dl,
            },
		}

		var d []struct {
			nm.Domain
			Tags []nm.Tag
		}

		if idErr == nil {
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

			if len(d) > 0 {
                data["view"].(map[string]interface{})["domainForm"] = d[0]
			}
		}

		template.Must(t.ParseFS(web.Fs, "partial/view-domain.html")).
			Execute(w, env.WithUrls(data))
	}
}
