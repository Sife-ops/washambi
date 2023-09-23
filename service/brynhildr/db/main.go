package db

import (
	"errors"

	. "github.com/go-jet/jet/v2/postgres"
	"github.com/go-jet/jet/v2/qrm"
	"github.com/google/uuid"

	nm "washambi-lib/db/nuland/model"
	nt "washambi-lib/db/nuland/table"
)

type Domain struct {
	nm.Domain
	Tags []nm.Tag
}

func DomainGetOne(db qrm.DB, userId uuid.UUID, domainId uuid.UUID) (*Domain, error) {
	var d []Domain

	if e := SELECT(nt.Domain.AllColumns, nt.Tag.AllColumns).
		FROM(
			nt.Domain.
				LEFT_JOIN(nt.DomainsTags, nt.DomainsTags.DomainID.EQ(nt.Domain.ID)).
				LEFT_JOIN(nt.Tag, nt.Tag.ID.EQ(nt.DomainsTags.TagID)),
		).
		WHERE(
			nt.Domain.UserID.EQ(UUID(userId)).
				AND(nt.Domain.ID.EQ(UUID(domainId))),
		).
		Query(db, &d); e != nil {
		return nil, e
	}

	if len(d) < 1 {
		return nil, errors.New("not found")
	}

	return &d[0], nil
}

func DomainUpsertTags(db qrm.DB, domain Domain, tags []string) error {
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
