package ajax

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	// "github.com/davecgh/go-spew/spew"
	. "github.com/go-jet/jet/v2/postgres"
	"github.com/google/uuid"

	bdb "brynhildr/db"
	"washambi-lib/db"
	nm "washambi-lib/db/nuland/model"
	nt "washambi-lib/db/nuland/table"
	"washambi-lib/mid"
)

func DomainTagsEdit(w http.ResponseWriter, r *http.Request) {
	auth := r.Context().Value("auth").(mid.AuthCtx)

	var j map[string]interface{}
	json.NewDecoder(r.Body).Decode(&j)
	var t []string
	for _, v := range j["tags"].([]interface{}) {
		t = append(t, v.(string))
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
				AND(nt.Domain.ID.EQ(UUID(uuid.MustParse(j["id"].(string))))),
		).
		Query(db.PgConn, &d); e != nil {
		log.Println(e)
		http.Error(w, "internal", http.StatusInternalServerError)
		return
	}

	var toDel []string
	var toAdd []string
	if len(d[0].Tags) > 0 {
		var a []string
		for _, v := range d[0].Tags {
			a = append(a, v.Name)
		}
		toDel = diffStrArr(a, t)
		toAdd = diffStrArr(t, a)
	} else {
		toAdd = t
	}

	tx, e := db.PgConn.BeginTx(context.Background(), nil)
	if e != nil {
		http.Error(w, "transaction", http.StatusInternalServerError)
		return
	}
	defer tx.Rollback()

	for _, v := range toDel {
		var td nm.Tag
		for _, w := range d[0].Tags {
			if w.Name == v {
				td = w
			}
		}
		if _, e := nt.DomainsTags.DELETE().
			WHERE(
				nt.DomainsTags.DomainID.EQ(UUID(d[0].ID)).
					AND(nt.DomainsTags.TagID.EQ(UUID(td.ID))),
			).
			Exec(tx); e != nil {
			log.Println(e)
			http.Error(w, "transaction", http.StatusInternalServerError)
			return
		}
	}

	if e := bdb.UpsertTags(tx, d[0], toAdd); e != nil {
		log.Println(e)
		http.Error(w, "transaction", http.StatusInternalServerError)
		return
	}

	if e := tx.Commit(); e != nil {
		log.Println(e)
		http.Error(w, "transaction", http.StatusInternalServerError)
		return
	}
}

// source: https://stackoverflow.com/questions/19374219/how-to-find-the-difference-between-two-slices-of-strings
// return elements in a not in b
func diffStrArr(a, b []string) []string {
	mb := make(map[string]struct{}, len(b))
	for _, x := range b {
		mb[x] = struct{}{}
	}
	var diff []string
	for _, x := range a {
		if _, found := mb[x]; !found {
			diff = append(diff, x)
		}
	}
	return diff
}
