package rpc

import (
	"context"
	"strings"

	"blazerxd/db"
	zm "blazerxd/db/zoomers/model"
	zt "blazerxd/db/zoomers/table"
	blazerxd_pb "washambi-rpc/blazerxd/v1"

	. "github.com/go-jet/jet/v2/postgres"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func fromDbUser(u *zm.User) *blazerxd_pb.User {
	var ua *timestamppb.Timestamp
	if u.UpdatedAt == nil {
		ua = nil
	} else {
		ua = timestamppb.New(*u.UpdatedAt)
	}

	var da *timestamppb.Timestamp
	if u.DeletedAt == nil {
		da = nil
	} else {
		da = timestamppb.New(*u.DeletedAt)
	}

	return &blazerxd_pb.User{
		Id:              u.ID.String(),
		Email:           u.Email,
		Password:        u.Password,
		RecoveryPrompt1: u.RecoveryPrompt1,
		RecoveryPrompt2: u.RecoveryPrompt2,
		RecoveryPrompt3: u.RecoveryPrompt3,
		RecoveryAnswer1: u.RecoveryAnswer1,
		RecoveryAnswer2: u.RecoveryAnswer2,
		RecoveryAnswer3: u.RecoveryAnswer3,
		CreatedAt:       timestamppb.New(u.CreatedAt),
		UpdatedAt:       ua,
		DeletedAt:       da,
	}
}

func (s *ServerImpl) Create(ctx context.Context, call *blazerxd_pb.CreateRequest) (*blazerxd_pb.CreateResponse, error) {
	stmt := zt.User.
		INSERT(
			zt.User.Email,
			zt.User.Password,
			zt.User.RecoveryPrompt1,
			zt.User.RecoveryPrompt2,
			zt.User.RecoveryPrompt3,
			zt.User.RecoveryAnswer1,
			zt.User.RecoveryAnswer2,
			zt.User.RecoveryAnswer3,
		).
		VALUES(
			call.Email,
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
		User: fromDbUser(&u[0]),
	}, nil
}

func (s *ServerImpl) Get(ctx context.Context, call *blazerxd_pb.GetRequest) (*blazerxd_pb.GetResponse, error) {
	stmt := SELECT(zt.User.ID, zt.User.Email, zt.User.Password).
		FROM(zt.User).
		WHERE(zt.User.Email.EQ(String(call.Email)))

	u := []zm.User{}
	e := stmt.Query(db.Connection, &u)
	if e != nil {
		return nil, e
	}

	if len(u) < 1 {
		return nil, status.Errorf(codes.NotFound, "user not found: %s", call.Email)
	}

	return &blazerxd_pb.GetResponse{
		User: fromDbUser(&u[0]),
	}, nil
}
