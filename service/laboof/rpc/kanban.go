package rpc

import (
	"context"

	// . "github.com/go-jet/jet/v2/postgres"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
    "github.com/google/uuid"

	tm "laboof/db/tomlinson/model"
	tt "laboof/db/tomlinson/table"
	"washambi-lib/db"
	laboof_pb "washambi-lib/rpc/laboof/v1"
)

func (s *ServerImpl) Create(ctx context.Context, call *laboof_pb.KanbanCreateRequest) (*laboof_pb.KanbanCreateResponse, error) {
	tx, e := db.Connection.BeginTx(ctx, nil)
	if e != nil {
		return nil, status.Error(codes.Aborted, e.Error())
	}
	defer tx.Rollback()

	// todo: unique name
	ks := tt.Kanban.
		INSERT(tt.Kanban.Name).
		VALUES(call.Name).
		RETURNING(tt.Kanban.AllColumns)

	var k []tm.Kanban
	if e := ks.Query(tx, &k); e != nil {
		// todo: already exists
		return nil, status.Error(codes.Aborted, e.Error())
	}

	uks := tt.UsersKanbans.
		INSERT(
			tt.UsersKanbans.UserID,
			tt.UsersKanbans.KanbanID,
			tt.UsersKanbans.Role,
		).
		VALUES(
			uuid.MustParse(call.UserId), // todo: sus
			k[0].ID,
			"owner",
		).
		RETURNING(tt.UsersKanbans.AllColumns)

	var uk []tm.UsersKanbans
	if e := uks.Query(tx, &uk); e != nil {
		// todo: already exists
		return nil, status.Error(codes.Aborted, e.Error())
	}

    // todo: swimlanes

	if e = tx.Commit(); e != nil {
		// todo: ???
		return nil, status.Error(codes.Aborted, e.Error())
	}

	return nil, nil
}
