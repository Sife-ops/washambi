package partial

import (
	"context"
	// "encoding/base64"
	"encoding/json"
	// "fmt"
	"html/template"
	// "io"
	"log"
	"net/http"
    "bytes"

	. "github.com/go-jet/jet/v2/postgres"
	"github.com/google/uuid"

	"brynhildr/web"
	"washambi-lib/db"
	nm "washambi-lib/db/nuland/model"
	nt "washambi-lib/db/nuland/table"
	"washambi-lib/mid"
	WashambiWeb "washambi-lib/web"
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
			WHERE(
				nt.Tag.UserID.EQ(UUID(uuid.MustParse(auth.Id()))).
					AND(nt.Tag.Name.EQ(String(tag))),
			).
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

	// // fetch favicon
	// go func() {
	// 	r, e := http.Get(fmt.Sprintf("https://%s/favicon.ico", dcr.Name))
	// 	if e != nil {
	// 		log.Println(e)
	// 		return
	// 	}
	//
	// 	b, e := io.ReadAll(r.Body)
	// 	if e != nil {
	// 		log.Println(e)
	// 		return
	// 	}
	//
	// 	if _, e := nt.Domain.
	// 		UPDATE(nt.Domain.Favicon).
	// 		SET(fmt.Sprintf(
	// 			"data:%s;base64,%s",
	// 			http.DetectContentType(b),
	// 			base64.StdEncoding.EncodeToString(b),
	// 		)).
	// 		WHERE(nt.Domain.ID.EQ(UUID(d[0].ID))).
	// 		Exec(db.PgConn); e != nil {
	// 		log.Println(e)
	// 	}
	// }()

    var p bytes.Buffer
	template.Must(
		template.
			New("domain-list-item").
			Funcs(WashambiWeb.Funcs).
			ParseFS(web.Fs, "partial/view-domain.html"),
	).Execute(&p, d[0])

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{
        "id": d[0].ID.String(),
        "frag": p.String(),
    })
}
