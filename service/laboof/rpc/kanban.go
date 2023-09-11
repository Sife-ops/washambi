package rpc

import (
	"context"

	tm "laboof/db/tomlinson/model"
	tt "laboof/db/tomlinson/table"
	"washambi-lib/db"
	laboof_pb "washambi-lib/rpc/laboof/v1"

	// . "github.com/go-jet/jet/v2/postgres"
)

func (s *ServerImpl) Create(ctx context.Context, call *laboof_pb.KanbanCreateRequest) (*laboof_pb.KanbanCreateResponse, error) {

	stmt := tt.Kanban.
		INSERT(tt.Kanban.Name).
		VALUES(call.Name).
		RETURNING(tt.Kanban.AllColumns)

	var k []tm.Kanban
	e := stmt.Query(db.Connection, &k)
	if e != nil {

	}

	return nil, nil
}
