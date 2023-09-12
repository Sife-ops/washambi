package rpc

import (
	"context"
	"fmt"

	. "github.com/go-jet/jet/v2/postgres"
	"github.com/google/uuid"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/timestamppb"

	"washambi-lib/db"
	tm "washambi-lib/db/tomlinson/model"
	tt "washambi-lib/db/tomlinson/table"
	laboof_pb "washambi-lib/rpc/laboof/v1"
)

func fromDbKanban(k *tm.Kanban) *laboof_pb.Kanban {
	var ua *timestamppb.Timestamp
	if k.UpdatedAt == nil {
		ua = nil
	} else {
		ua = timestamppb.New(*k.UpdatedAt)
	}

	var da *timestamppb.Timestamp
	if k.DeletedAt == nil {
		da = nil
	} else {
		da = timestamppb.New(*k.DeletedAt)
	}

	return &laboof_pb.Kanban{
		Id:        k.ID.String(),
		Name:      k.Name,
		CreatedAt: timestamppb.New(k.CreatedAt),
		UpdatedAt: ua,
		DeletedAt: da,
	}
}

func (s *ServerImpl) KanbanCreate(ctx context.Context, call *laboof_pb.KanbanCreateRequest) (*laboof_pb.KanbanCreateResponse, error) {
	var found []struct {
		tm.UsersKanbans
		Kanbans []tm.Kanban
	}
	if e := SELECT(
		tt.UsersKanbans.AllColumns,
		tt.Kanban.AllColumns,
	).
		FROM(
            // tt.Kanban,
			tt.UsersKanbans.INNER_JOIN(
				tt.Kanban,
				tt.Kanban.ID.EQ(tt.UsersKanbans.KanbanID),
			),
		).
		WHERE(
			tt.UsersKanbans.UserID.EQ(UUID(uuid.MustParse(call.UserId))),
		).
		WHERE(
			tt.UsersKanbans.Role.EQ(String("owner")),
		).
		WHERE(
			tt.Kanban.Name.EQ(String(call.Name)),
		).
		Query(db.Connection, &found); e != nil {
		return nil, status.Error(codes.Internal, e.Error())
	}

	if len(found) > 0 {
		return nil, status.Error(
			codes.AlreadyExists,
			fmt.Sprintf("duplicate kanban name: %s", call.Name),
		)
	}

	tx, e := db.Connection.BeginTx(ctx, nil)
	if e != nil {
		return nil, status.Error(codes.Aborted, e.Error())
	}
	defer tx.Rollback()

	ks := tt.Kanban.
		INSERT(tt.Kanban.Name).
		VALUES(call.Name).
		RETURNING(tt.Kanban.AllColumns)

	var k []tm.Kanban
	if e := ks.Query(tx, &k); e != nil {
		return nil, status.Error(codes.Aborted, e.Error())
	}

	if _, e := tt.UsersKanbans.
		INSERT(
			tt.UsersKanbans.UserID,
			tt.UsersKanbans.KanbanID,
			tt.UsersKanbans.Role,
		).
		VALUES(
			uuid.MustParse(call.UserId),
			k[0].ID,
			"owner",
		).
		Exec(tx); e != nil {
		return nil, status.Error(codes.Aborted, e.Error())
	}

	ls := []string{"Todo", "In Progress", "Done"}
	for i, l := range ls {
		if _, e := tt.Swimlane.
			INSERT(
				tt.Swimlane.KanbanID,
				tt.Swimlane.Name,
				tt.Swimlane.Index,
			).
			VALUES(k[0].ID, l, i).
			Exec(tx); e != nil {
			return nil, status.Error(codes.Aborted, e.Error())
		}
	}

	if e = tx.Commit(); e != nil {
		return nil, status.Error(codes.Aborted, e.Error())
	}

	return &laboof_pb.KanbanCreateResponse{
		Kanban: fromDbKanban(&k[0]),
	}, nil
}
