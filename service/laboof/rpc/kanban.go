package rpc

import (
	"context"
	"fmt"
	"time"

	// "github.com/davecgh/go-spew/spew"
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

type DbKanbanList []struct {
	tm.Kanban
	UsersKanbans []tm.UsersKanbans
}

func fromTime(t *time.Time) *timestamppb.Timestamp {
	var ts *timestamppb.Timestamp
	if t == nil {
		ts = nil
	} else {
		ts = timestamppb.New(*t)
	}
	return ts
}

func fromDbKanbanList(ks DbKanbanList) []*laboof_pb.Kanban {
	var kanbans []*laboof_pb.Kanban

	for _, v := range ks {
		var usersKanbans *laboof_pb.UsersKanbans
		for _, w := range v.UsersKanbans {
			usersKanbans = &laboof_pb.UsersKanbans{
				Id:        w.ID.String(),
				UserId:    w.UserID.String(),
				KanbanId:  w.KanbanID.String(),
				Role:      w.Role,
				CreatedAt: timestamppb.New(w.CreatedAt),
				UpdatedAt: fromTime(w.UpdatedAt),
				DeletedAt: fromTime(w.DeletedAt),
			}
		}

		kanbans = append(kanbans, &laboof_pb.Kanban{
			Id:           v.ID.String(),
			Name:         v.Name,
			UsersKanbans: usersKanbans,
			CreatedAt:    timestamppb.New(v.CreatedAt),
			UpdatedAt:    fromTime(v.UpdatedAt),
			DeletedAt:    fromTime(v.DeletedAt),
		})
	}

	return kanbans
}

func (s *ServerImpl) KanbanCreate(ctx context.Context, call *laboof_pb.KanbanCreateRequest) (*laboof_pb.KanbanCreateResponse, error) {
	var found DbKanbanList
	if e := SELECT(
		tt.Kanban.AllColumns,
		tt.UsersKanbans.AllColumns,
	).
		FROM(
			tt.Kanban.INNER_JOIN(
				tt.UsersKanbans,
				tt.UsersKanbans.KanbanID.EQ(tt.Kanban.ID),
			),
		).
		WHERE(tt.UsersKanbans.UserID.EQ(UUID(uuid.MustParse(call.UserId)))).
		WHERE(tt.UsersKanbans.Role.EQ(String("owner"))).
		WHERE(tt.Kanban.Name.EQ(String(call.Name))).
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

	var kl DbKanbanList
	if e := ks.Query(tx, &kl); e != nil {
		return nil, status.Error(codes.Aborted, e.Error())
	}

	var uk []tm.UsersKanbans
	if e := tt.UsersKanbans.
		INSERT(
			tt.UsersKanbans.UserID,
			tt.UsersKanbans.KanbanID,
			tt.UsersKanbans.Role,
		).
		VALUES(
			uuid.MustParse(call.UserId),
			kl[0].ID,
			"owner",
		).
		RETURNING(tt.UsersKanbans.AllColumns).
		Query(tx, &uk); e != nil {
		return nil, status.Error(codes.Aborted, e.Error())
	}

    kl[0].UsersKanbans = uk

	ls := []string{"Todo", "In Progress", "Done"}
	for i, l := range ls {
		if _, e := tt.Swimlane.
			INSERT(
				tt.Swimlane.KanbanID,
				tt.Swimlane.Name,
				tt.Swimlane.Index,
			).
			VALUES(kl[0].ID, l, i).
			Exec(tx); e != nil {
			return nil, status.Error(codes.Aborted, e.Error())
		}
	}

	if e = tx.Commit(); e != nil {
		return nil, status.Error(codes.Aborted, e.Error())
	}

	return &laboof_pb.KanbanCreateResponse{
		Kanban: fromDbKanbanList(kl)[0],
	}, nil
}

func (s *ServerImpl) KanbanList(ctx context.Context, call *laboof_pb.KanbanListRequest) (*laboof_pb.KanbanListResponse, error) {
	var k DbKanbanList
	if e := SELECT(
		tt.Kanban.AllColumns,
		tt.UsersKanbans.AllColumns,
	).
		FROM(
			tt.Kanban.INNER_JOIN(
				tt.UsersKanbans,
				tt.UsersKanbans.KanbanID.EQ(tt.Kanban.ID),
			),
		).
		WHERE(tt.UsersKanbans.UserID.EQ(UUID(uuid.MustParse(call.UserId)))).
		Query(db.Connection, &k); e != nil {
		return nil, status.Error(codes.Internal, e.Error())
	}

	return &laboof_pb.KanbanListResponse{
		Kanbans: fromDbKanbanList(k),
	}, nil
}
