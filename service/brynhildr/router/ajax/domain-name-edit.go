package ajax

import (
	"encoding/json"
	"log"
	"net/http"

	// "github.com/davecgh/go-spew/spew"
	. "github.com/go-jet/jet/v2/postgres"
	"github.com/google/uuid"

	"washambi-lib/db"
	nm "washambi-lib/db/nuland/model"
	nt "washambi-lib/db/nuland/table"
	"washambi-lib/mid"
)

func DomainNameEdit(w http.ResponseWriter, r *http.Request) {
	auth := r.Context().Value("auth").(mid.AuthCtx)

	var j map[string]string
	json.NewDecoder(r.Body).Decode(&j)

	var d []nm.Domain
	if e := nt.Domain.
		UPDATE(nt.Domain.Name).
		WHERE(
			nt.Domain.UserID.EQ(UUID(uuid.MustParse(auth.Id()))).
				AND(nt.Domain.ID.EQ(UUID(uuid.MustParse(j["id"])))),
		).
		SET(j["name"]).
		RETURNING(nt.Domain.AllColumns).
		Query(db.PgConn, &d); e != nil {
		log.Println(e)
		http.Error(w, "internal", http.StatusInternalServerError)
		return
	}
}
