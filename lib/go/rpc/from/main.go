package from

import (
	"time"

	"google.golang.org/protobuf/types/known/timestamppb"

	tm "washambi-lib/db/tomlinson/model"
	zm "washambi-lib/db/zoomers/model"
	blazerxd_pb "washambi-lib/rpc/blazerxd/v1"
	laboof_pb "washambi-lib/rpc/laboof/v1"
)

func fromTime(t *time.Time) *timestamppb.Timestamp {
	var ts *timestamppb.Timestamp
	if t == nil {
		ts = nil
	} else {
		ts = timestamppb.New(*t)
	}
	return ts
}

func DbUser(u zm.User) *blazerxd_pb.User {
	return &blazerxd_pb.User{
		Id:              u.ID.String(),
		Username:        u.Username,
		Password:        u.Password,
		RecoveryPrompt1: u.RecoveryPrompt1,
		RecoveryPrompt2: u.RecoveryPrompt2,
		RecoveryPrompt3: u.RecoveryPrompt3,
		RecoveryAnswer1: u.RecoveryAnswer1,
		RecoveryAnswer2: u.RecoveryAnswer2,
		RecoveryAnswer3: u.RecoveryAnswer3,
		CreatedAt:       timestamppb.New(u.CreatedAt),
		UpdatedAt:       fromTime(u.UpdatedAt),
		DeletedAt:       fromTime(u.DeletedAt),
	}
}

func DbSwimlane(s tm.Swimlane) *laboof_pb.Swimlane {
	return &laboof_pb.Swimlane{
		Id:        s.ID.String(),
		KanbanId:  s.KanbanID.String(),
		Name:      s.Name,
		Index:     s.Index,
		CreatedAt: timestamppb.New(s.CreatedAt),
		UpdatedAt: fromTime(s.UpdatedAt),
		DeletedAt: fromTime(s.DeletedAt),
	}
}

type Kanban []struct {
	tm.Kanban
	UsersKanbans []tm.UsersKanbans
	User         []zm.User
	Swimlane     []tm.Swimlane
}

func DbKanbanList(ks Kanban) []*laboof_pb.Kanban {
	var kanbans []*laboof_pb.Kanban
	for _, v := range ks {
		k := &laboof_pb.Kanban{
			Id:        v.ID.String(),
			Name:      v.Name,
			CreatedAt: timestamppb.New(v.CreatedAt),
			UpdatedAt: fromTime(v.UpdatedAt),
			DeletedAt: fromTime(v.DeletedAt),
		}

		for _, w := range v.UsersKanbans {
			k.UsersKanbans = &laboof_pb.UsersKanbans{
				Id:        w.ID.String(),
				UserId:    w.UserID.String(),
				KanbanId:  w.KanbanID.String(),
				Role:      w.Role,
				CreatedAt: timestamppb.New(w.CreatedAt),
				UpdatedAt: fromTime(w.UpdatedAt),
				DeletedAt: fromTime(w.DeletedAt),
			}
		}

		for _, w := range v.User {
			k.UsersKanbans.User = DbUser(w)
		}

		for _, w := range v.Swimlane {
			k.Swimlane = append(k.Swimlane, DbSwimlane(w))
		}

		kanbans = append(kanbans, k)
	}
	return kanbans
}
