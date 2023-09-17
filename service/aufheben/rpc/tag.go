package rpc

import (
	"context"
	"fmt"

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

func (s *ServerImpl) TagCreate(ctx context.Context, call *aufheben_pb.TagCreateRequest) (*aufheben_pb.TagCreateResponse, error) {
	var t []nm.Tag
	if e := SELECT(nt.Tag.AllColumns).
		FROM(nt.Tag).
		WHERE(nt.Tag.UserID.EQ(UUID(uuid.MustParse(call.UserId)))).
		WHERE(nt.Tag.Name.EQ(String(call.Name))).
		Query(db.PgConn, &t); e != nil {
		return nil, status.Error(codes.Internal, e.Error())
	}
	if len(t) > 0 {
		return nil, status.Error(
			codes.AlreadyExists,
			fmt.Sprintf("duplicate tag name: %s", call.Name),
		)
	}
	if e := nt.Tag.
		INSERT(nt.Tag.Name).
		VALUES(call.Name).
		RETURNING(nt.Tag.AllColumns).
		Query(db.PgConn, &t); e != nil {
		return nil, status.Error(codes.Internal, e.Error())
	}
	return &aufheben_pb.TagCreateResponse{
		Tag: from.DbTagList(t)[0],
	}, nil
}

func (s *ServerImpl) TagList(ctx context.Context, call *aufheben_pb.TagListRequest) (*aufheben_pb.TagListResponse, error) {
	var t []nm.Tag
	if e := SELECT(nt.Tag.AllColumns).
		FROM(nt.Tag).
		WHERE(nt.Tag.UserID.EQ(UUID(uuid.MustParse(call.UserId)))).
		Query(db.PgConn, &t); e != nil {
		return nil, status.Error(codes.Internal, e.Error())
	}
	return &aufheben_pb.TagListResponse{
		Tags: from.DbTagList(t),
	}, nil
}
