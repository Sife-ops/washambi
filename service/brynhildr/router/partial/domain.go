package partial

import (
	"bytes"
	"context"
	"encoding/json"
	"html/template"
	"log"
	"net/http"

	// "github.com/davecgh/go-spew/spew"
	"github.com/go-chi/chi/v5"
	. "github.com/go-jet/jet/v2/postgres"
	"github.com/google/uuid"

	bdb "brynhildr/db"
	"brynhildr/web"
	"washambi-lib/db"
	nm "washambi-lib/db/nuland/model"
	nt "washambi-lib/db/nuland/table"
	"washambi-lib/mid"
	WashambiWeb "washambi-lib/web"
)

func DomainView(w http.ResponseWriter, r *http.Request) {
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
			ParseFS(web.Fs, "partial/domain.html"),
	).Execute(w, map[string]interface{}{
		"domainList": dl,
        "domainForm": map[string]interface{}{
            "ID": uuid.New().String(),
        },
	})
}

func DomainGet(w http.ResponseWriter, r *http.Request) {
	t := template.Must(
		template.
			New("domain-form").
			Funcs(WashambiWeb.Funcs).
			ParseFS(web.Fs, "partial/domain.html"),
	)

	p := chi.URLParam(r, "id")
	if p == "new" {
        t.Execute(w, map[string]interface{}{
            "ID": uuid.New().String(),
        })
		return
	}

	auth := r.Context().Value("auth").(mid.AuthCtx)

	id, e := uuid.Parse(p)
	if e != nil {
		log.Println(e)
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
		log.Println(e)
		http.Error(w, "transaction", http.StatusInternalServerError)
		return
	}
	defer tx.Rollback()

	var d []struct {
		nm.Domain
		Tags []nm.Tag
	}
	if e := nt.Domain.
		INSERT(nt.Domain.UserID, nt.Domain.Name).
		VALUES(auth.Id(), dcr.Name).
		RETURNING(nt.Domain.AllColumns).
		Query(tx, &d); e != nil {
		log.Println(e)
		http.Error(w, "transaction", http.StatusInternalServerError)
		return
	}

	if e := bdb.DomainUpsertTags(tx, d[0], dcr.Tags); e != nil {
		log.Println(e)
		http.Error(w, "transaction", http.StatusInternalServerError)
		return
	}

	if e := tx.Commit(); e != nil {
		log.Println(e)
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
			ParseFS(web.Fs, "partial/domain.html"),
	).Execute(&p, d[0])

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"id":   d[0].ID.String(),
		"frag": p.String(),
	})
}
