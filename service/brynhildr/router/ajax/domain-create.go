package ajax

import (
	"context"
	"encoding/json"
	"html/template"
	"log"
	"net/http"

	. "github.com/go-jet/jet/v2/postgres"
	"github.com/google/uuid"

	"brynhildr/web"
	"washambi-lib/db"
	nm "washambi-lib/db/nuland/model"
	nt "washambi-lib/db/nuland/table"
	"washambi-lib/mid"
)

type domainCreateReq struct {
	Name string
	Tags []string
}

func DomainCreate(w http.ResponseWriter, r *http.Request) {
	auth := r.Context().Value("auth").(mid.AuthCtx)

	var dcr domainCreateReq
	json.NewDecoder(r.Body).Decode(&dcr)

	tx, e := db.PgConn.BeginTx(context.Background(), nil)
	if e != nil {
		http.Error(w, "transaction", http.StatusInternalServerError)
		return
	}
	defer tx.Rollback()

	var d []nm.Domain
	if e := nt.Domain.
		INSERT(nt.Domain.UserID, nt.Domain.Name).
		VALUES(auth.Id(), dcr.Name).
		RETURNING(nt.Domain.AllColumns).
		Query(tx, &d); e != nil {
		http.Error(w, "transaction", http.StatusInternalServerError)
		return
	}

	for _, tag := range dcr.Tags {
		var t []nm.Tag
		if e := SELECT(nt.Tag.AllColumns).
			FROM(nt.Tag).
			WHERE(nt.Tag.UserID.EQ(UUID(uuid.MustParse(auth.Id())))).
			WHERE(nt.Tag.Name.EQ(String(tag))).
			Query(tx, &t); e != nil {
			log.Println(e)
			http.Error(w, "transaction", http.StatusInternalServerError)
			return
		}
		if len(t) < 1 {
			if e := nt.Tag.
				INSERT(nt.Tag.Name, nt.Tag.UserID).
				VALUES(tag, auth.Id()).
				RETURNING(nt.Tag.AllColumns).
				Query(tx, &t); e != nil {
				log.Println(e)
				http.Error(w, "transaction", http.StatusInternalServerError)
				return
			}
		}
		if _, e := nt.DomainsTags.
			INSERT(nt.DomainsTags.DomainID, nt.DomainsTags.TagID).
			VALUES(d[0].ID, t[0].ID).
			Exec(tx); e != nil {
			log.Println(e)
			http.Error(w, "transaction", http.StatusInternalServerError)
			return
		}
	}

	if e := tx.Commit(); e != nil {
		http.Error(w, "transaction", http.StatusInternalServerError)
		return
	}

	template.Must(
		template.
			New("domain-list-item").
			ParseFS(web.Fs, "page/home-auth.html"),
	).Execute(w, d[0])
}
