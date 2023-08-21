package rpc

import (
	"context"
	"strings"

	zm "blazerxd/db/zoomers/model"
	zt "blazerxd/db/zoomers/table"
	blazerxd_pb "washambi-rpc/blazerxd/v1"

	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/timestamppb"
    . "github.com/go-jet/jet/v2/postgres"
)

func fromDbUser(u *zm.User) *blazerxd_pb.User {
	var da *timestamppb.Timestamp
	if u.DeletedAt == nil {
		da = nil
	} else {
		da = timestamppb.New(*u.DeletedAt)
	}

	return &blazerxd_pb.User{
		Id:        u.ID.String(),
		Email:     u.Email,
		Password:  u.Password,
		CreatedAt: timestamppb.New(u.CreatedAt),
		DeletedAt: da,
	}
}

func (s *ServerImpl) Create(ctx context.Context, call *blazerxd_pb.CreateRequest) (*blazerxd_pb.CreateResponse, error) {
	stmt := zt.User.
		INSERT(zt.User.Email, zt.User.Password).
		VALUES(call.Email, call.Password).
		RETURNING(zt.User.AllColumns)

	u := []zm.User{}
	e := stmt.Query(s.Db, &u)
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
    e := stmt.Query(s.Db, &u)
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

