package rpc

import (
	"context"

	zm "blazerxd/db/zoomers/model"
	zt "blazerxd/db/zoomers/table"
	blazerxd_pb "washambi-rpc/blazerxd/v1"

	// "github.com/davecgh/go-spew/spew"
	// . "github.com/go-jet/jet/v2/postgres"
	"google.golang.org/protobuf/types/known/timestamppb"
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
        return nil, e
    }
	// spew.Dump(u)

	return &blazerxd_pb.CreateResponse{
		User: fromDbUser(&u[0]),
	}, nil
}
