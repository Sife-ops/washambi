package test

import (
	. "github.com/go-jet/jet/v2/postgres"

	"washambi-lib/db"
	tm "washambi-lib/db/tomlinson/model"
	tt "washambi-lib/db/tomlinson/table"
	zm "washambi-lib/db/zoomers/model"
	zt "washambi-lib/db/zoomers/table"
	blazerxd_pb "washambi-lib/rpc/blazerxd/v1"
	laboof_pb "washambi-lib/rpc/laboof/v1"
)

var User = blazerxd_pb.User{
	Username:        "69blazer420",
	Password:        "blazerxd",
	RecoveryPrompt1: "favorite book",
	RecoveryPrompt2: "favorite movie",
	RecoveryPrompt3: "favorite food",
	RecoveryAnswer1: "teh stand",
	RecoveryAnswer2: "teh thing",
	RecoveryAnswer3: "piza",
}

func CreateUser() (*zm.User, error) {
	u := []zm.User{}
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
			User.Username,
			User.Password,
			User.RecoveryPrompt1,
			User.RecoveryPrompt2,
			User.RecoveryPrompt3,
			User.RecoveryAnswer1,
			User.RecoveryAnswer2,
			User.RecoveryAnswer3,
		).
		RETURNING(zt.User.AllColumns)
	e := stmt.Query(db.Connection, &u)
	return &u[0], e
}

func DeleteUser() error {
	if _, e := zt.User.
		DELETE().
		WHERE(zt.User.Username.EQ(String(User.Username))).
		Exec(db.Connection); e != nil {
		return e
	}
	return nil
}

var Kanban = laboof_pb.Kanban{
	Name: "factos",
}

func CreateKanban(u *zm.User) (*tm.Kanban, error) {
	var k []tm.Kanban
	if e := tt.Kanban.
		INSERT(tt.Kanban.Name).
		VALUES(Kanban.Name).
		RETURNING(tt.Kanban.AllColumns).
		Query(db.Connection, &k); e != nil {
		return nil, e
	}

	if _, e := tt.UsersKanbans.
		INSERT(
			tt.UsersKanbans.UserID,
			tt.UsersKanbans.KanbanID,
			tt.UsersKanbans.Role,
		).
		VALUES(
			u.ID,
			k[0].ID,
			"owner",
		).
		Exec(db.Connection); e != nil {
		return nil, e
	}

	return &k[0], nil
}

func DeleteKanban() error {
	if _, e := tt.Kanban.
		DELETE().
		WHERE(tt.Kanban.Name.EQ(String(Kanban.Name))).
		Exec(db.Connection); e != nil {
		return e
	}
	return nil
}
