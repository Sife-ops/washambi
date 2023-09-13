package rpc

import (
	"context"
	"strings"

	. "github.com/go-jet/jet/v2/postgres"
	"github.com/google/uuid"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"

	"washambi-lib/db"
	zm "washambi-lib/db/zoomers/model"
	zt "washambi-lib/db/zoomers/table"
	blazerxd_pb "washambi-lib/rpc/blazerxd/v1"
	"washambi-lib/rpc/from"
)

func (s *ServerImpl) Create(ctx context.Context, call *blazerxd_pb.CreateRequest) (*blazerxd_pb.CreateResponse, error) {
	stmt := zt.User.
		INSERT(
			zt.User.Username,
			zt.User.Password,
			zt.User.RecoveryPrompt1,
			zt.User.RecoveryPrompt2,
			zt.User.RecoveryPrompt3,
			zt.User.RecoveryAnswer1,
			zt.User.RecoveryAnswer2,
			zt.User.RecoveryAnswer3,
		).
		VALUES(
			call.Username,
			call.Password,
			call.RecoveryPrompt1,
			call.RecoveryPrompt2,
			call.RecoveryPrompt3,
			call.RecoveryAnswer1,
			call.RecoveryAnswer2,
			call.RecoveryAnswer3,
		).
		RETURNING(zt.User.AllColumns)

	u := []zm.User{}
	e := stmt.Query(db.Connection, &u)
	if e != nil {
		if strings.Contains(e.Error(), "23505") {
			return nil, status.Error(codes.AlreadyExists, e.Error())
		}
		return nil, e
	}

	return &blazerxd_pb.CreateResponse{
		User: from.DbUser(u[0]),
	}, nil
}

func (s *ServerImpl) Get(ctx context.Context, call *blazerxd_pb.GetRequest) (*blazerxd_pb.GetResponse, error) {
	stmt := SELECT(zt.User.AllColumns).
		FROM(zt.User).
		WHERE(zt.User.Username.EQ(String(call.Username)))

	u := []zm.User{}
	e := stmt.Query(db.Connection, &u)
	if e != nil {
		return nil, e
	}

	if len(u) < 1 {
		return nil, status.Errorf(codes.NotFound, "user not found: %s", call.Username)
	}

	return &blazerxd_pb.GetResponse{
		User: from.DbUser(u[0]),
	}, nil
}

func (s *ServerImpl) ChangePassword(ctx context.Context, call *blazerxd_pb.ChangePasswordRequest) (*blazerxd_pb.ChangePasswordResponse, error) {
	u := []zm.User{}
	e := zt.User.
		UPDATE(zt.User.Password).
		SET(call.Password).
		WHERE(zt.User.ID.EQ(UUID(uuid.MustParse(call.Id)))). // todo: panics
		RETURNING(zt.User.AllColumns).
		Query(db.Connection, &u)
	if e != nil {
		return nil, e
	}

	if len(u) < 1 {
		return nil, status.Errorf(codes.NotFound, "user not found: %s", call.Id)
	}

	return &blazerxd_pb.ChangePasswordResponse{
		User: from.DbUser(u[0]),
	}, nil
}
