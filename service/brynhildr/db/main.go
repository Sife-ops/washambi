package db

import (
	. "github.com/go-jet/jet/v2/postgres"
	"github.com/go-jet/jet/v2/qrm"

	nm "washambi-lib/db/nuland/model"
	nt "washambi-lib/db/nuland/table"
)

func UpsertTags(db qrm.DB, domain struct {
	nm.Domain
	Tags []nm.Tag
}, tags []string) error {
	for _, v := range tags {
		var t []nm.Tag
		if e := SELECT(nt.Tag.AllColumns).
			FROM(nt.Tag).
			WHERE(
				nt.Tag.UserID.EQ(UUID(domain.UserID)).
					AND(nt.Tag.Name.EQ(String(v))),
			).
			Query(db, &t); e != nil {
			return e
		}
		if len(t) < 1 {
			if e := nt.Tag.
				INSERT(nt.Tag.Name, nt.Tag.UserID).
				VALUES(v, domain.UserID.String()).
				RETURNING(nt.Tag.AllColumns).
				Query(db, &t); e != nil {
				return e
			}
		}
		if _, e := nt.DomainsTags.
			INSERT(nt.DomainsTags.DomainID, nt.DomainsTags.TagID).
			VALUES(domain.ID, t[0].ID).
			Exec(db); e != nil {
			return e
		}
	}
	return nil
}
