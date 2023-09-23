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

	domainId, e := uuid.Parse(j["id"].(string))
	if e != nil {
		http.Error(w, "uuid", http.StatusBadRequest)
		return
	}

	d, e := bdb.DomainGetOne(db.PgConn, uuid.MustParse(auth.Id()), domainId)
	if e != nil {
		log.Println(e)
		http.Error(w, "internal", http.StatusInternalServerError)
		return
	}

	var toDel []string
	var toAdd []string
	if len(d.Tags) > 0 {
		var a []string
		for _, v := range d.Tags {
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
		for _, w := range d.Tags {
			if w.Name == v {
				td = w
			}
		}
		if _, e := nt.DomainsTags.DELETE().
			WHERE(
				nt.DomainsTags.DomainID.EQ(UUID(d.ID)).
					AND(nt.DomainsTags.TagID.EQ(UUID(td.ID))),
			).
			Exec(tx); e != nil {
			log.Println(e)
			http.Error(w, "transaction", http.StatusInternalServerError)
			return
		}
	}

	if e := bdb.DomainUpsertTags(tx, *d, toAdd); e != nil {
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
