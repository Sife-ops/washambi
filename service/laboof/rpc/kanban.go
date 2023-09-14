package rpc

import (
	"context"
	"fmt"

	. "github.com/go-jet/jet/v2/postgres"
	"github.com/google/uuid"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"

	"washambi-lib/db"
	tm "washambi-lib/db/tomlinson/model"
	tt "washambi-lib/db/tomlinson/table"
	zm "washambi-lib/db/zoomers/model"
	zt "washambi-lib/db/zoomers/table"
	"washambi-lib/rpc/from"
	laboof_pb "washambi-lib/rpc/laboof/v1"
)

func (s *ServerImpl) KanbanCreate(ctx context.Context, call *laboof_pb.KanbanCreateRequest) (*laboof_pb.KanbanCreateResponse, error) {
	var found from.Kanban
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

	var kl from.Kanban
	if e := ks.Query(tx, &kl); e != nil {
		return nil, status.Error(codes.Aborted, e.Error())
	}

	// todo: join user
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

	var u []zm.User
	SELECT(zt.User.AllColumns).
		FROM(zt.User).
		WHERE(zt.User.ID.EQ(UUID(uuid.MustParse(call.UserId)))).
		Query(tx, &u)
	kl[0].User = u

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
		Kanban: from.DbKanbanList(kl)[0],
	}, nil
}

func (s *ServerImpl) KanbanList(ctx context.Context, call *laboof_pb.KanbanListRequest) (*laboof_pb.KanbanListResponse, error) {
	var k from.Kanban
	if e := SELECT(
		tt.Kanban.AllColumns,
		tt.UsersKanbans.AllColumns,
		zt.User.AllColumns,
	).
		FROM(
			tt.Kanban.
				INNER_JOIN(
					tt.UsersKanbans,
					tt.UsersKanbans.KanbanID.EQ(tt.Kanban.ID),
				).
				INNER_JOIN(
					zt.User,
					zt.User.ID.EQ(tt.UsersKanbans.UserID),
				),
		).
		WHERE(tt.UsersKanbans.UserID.EQ(UUID(uuid.MustParse(call.UserId)))).
		Query(db.Connection, &k); e != nil {
		return nil, status.Error(codes.Internal, e.Error())
	}

	return &laboof_pb.KanbanListResponse{
		Kanbans: from.DbKanbanList(k),
	}, nil
}

func (s *ServerImpl) KanbanGet(ctx context.Context, call *laboof_pb.KanbanGetRequest) (*laboof_pb.KanbanGetResponse, error) {
	var k from.Kanban
	if e := SELECT(
		tt.Kanban.AllColumns,
		tt.Swimlane.AllColumns,
		// tt.UsersKanbans.AllColumns,
		// zt.User.AllColumns,
	).
		FROM(
			tt.Kanban.
				INNER_JOIN(
					tt.Swimlane,
					tt.Swimlane.KanbanID.EQ(tt.Kanban.ID),
				),
			// INNER_JOIN(
			// 	zt.User,
			// 	zt.User.ID.EQ(tt.UsersKanbans.UserID),
			// ),
		).
		WHERE(tt.Kanban.ID.EQ(UUID(uuid.MustParse(call.KanbanId)))).
		Query(db.Connection, &k); e != nil {
		return nil, status.Error(codes.Internal, e.Error())
	}

	return &laboof_pb.KanbanGetResponse{
		Kanban: from.DbKanbanList(k)[0],
	}, nil
}
