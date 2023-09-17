package rpc

import (
	"context"

	. "github.com/go-jet/jet/v2/postgres"
	"github.com/google/uuid"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"

	"washambi-lib/db"
	nm "washambi-lib/db/nuland/model"
	nt "washambi-lib/db/nuland/table"
	aufheben_pb "washambi-lib/rpc/aufheben/v1"
	"washambi-lib/rpc/from"
)

func (s *ServerImpl) DomainCreate(ctx context.Context, call *aufheben_pb.DomainCreateRequest) (*aufheben_pb.DomainCreateResponse, error) {
	tx, e := db.Connection.BeginTx(ctx, nil)
	if e != nil {
		return nil, status.Error(codes.Aborted, e.Error())
	}
	defer tx.Rollback()

	var cds []nm.Domain
	if e := nt.Domain.
		INSERT(nt.Domain.UserID, nt.Domain.Name).
		VALUES(call.UserId, call.Name).
		RETURNING(nt.Domain.AllColumns).
		Query(tx, &cds); e != nil {
		return nil, status.Error(codes.Internal, e.Error())
	}

	if len(call.TagNames) > 0 {
		var fts []nm.Tag
		if e := SELECT(nt.Tag.AllColumns).
			FROM(nt.Tag).
			WHERE(nt.Tag.UserID.EQ(UUID(uuid.MustParse(call.UserId)))).
			Query(tx, &fts); e != nil {
			return nil, status.Error(codes.Internal, e.Error())
		}
		// todo: where-in

		var ots []nm.Tag
		var nts []string
		for _, rt := range call.TagNames {
			f := true
			for _, ft := range fts {
				if ft.Name == rt {
					f = false
					ots = append(ots, ft)
					break
				}
			}
			if f {
				nts = append(nts, rt)
			}
		}

		for _, nt_ := range nts {
			var cts []nm.Tag
			if e := nt.Tag.
				INSERT(nt.Tag.UserID, nt.Tag.Name).
				VALUES(call.UserId, nt_).
				RETURNING(nt.Tag.AllColumns).
				Query(tx, &cts); e != nil {
				return nil, status.Error(codes.Internal, e.Error())
			}
			ots = append(ots, cts[0])
		}

		for _, ot := range ots {
			if _, e := nt.DomainsTags.
				INSERT(nt.DomainsTags.DomainID, nt.DomainsTags.TagID).
				VALUES(cds[0].ID, ot.ID).
				Exec(tx); e != nil {
				return nil, status.Error(codes.Internal, e.Error())
			}
		}
	}

	if e = tx.Commit(); e != nil {
		return nil, status.Error(codes.Aborted, e.Error())
	}

	return &aufheben_pb.DomainCreateResponse{
		Domain: from.DbDomainList(cds)[0],
	}, nil
}
