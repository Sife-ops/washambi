package rpc

import (
	"context"
	"os"
	"strings"
	"testing"

	"blazerxd/db"
	zm "blazerxd/db/zoomers/model"
	zt "blazerxd/db/zoomers/table"
	"blazerxd/test"
	blazerxd_pb "washambi-rpc/blazerxd/v1"

	. "github.com/go-jet/jet/v2/postgres"
)

func TestMain(m *testing.M) {
	// before all

	code := m.Run()

	// after all
	os.Exit(code)
}

// move to package test
var testUser = blazerxd_pb.User{
	Email:           "blazer@xd.com",
	Password:        "blazerxd",
	RecoveryPrompt1: "favorite book",
	RecoveryPrompt2: "favorite movie",
	RecoveryPrompt3: "favorite food",
	RecoveryAnswer1: "teh stand",
	RecoveryAnswer2: "teh thing",
	RecoveryAnswer3: "piza",
}

// move to package test
func createTestUser() (*zm.User, error) {
	u := []zm.User{}
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
			testUser.Email,
			testUser.Password,
			testUser.RecoveryPrompt1,
			testUser.RecoveryPrompt2,
			testUser.RecoveryPrompt3,
			testUser.RecoveryAnswer1,
			testUser.RecoveryAnswer2,
			testUser.RecoveryAnswer3,
		).
		RETURNING(zt.User.AllColumns)
	e := stmt.Query(db.Connection, &u)
	return &u[0], e
}

// move to package test
func deleteTestUser() {
	stmt := zt.User.DELETE().WHERE(zt.User.Email.EQ(String(testUser.Email)))
	stmt.Exec(db.Connection)
}

func beforeEach() {
	deleteTestUser()
}

func afterEach() {
	deleteTestUser()
}

func Test_Create_Success(t *testing.T) {
	beforeEach()
	defer afterEach()

	_, e := test.BlazerxdClient.Create(context.TODO(), &blazerxd_pb.CreateRequest{
		Email:    testUser.Email,
		Password: testUser.Password,
	})
	if e != nil {
		t.Fatal(e)
	}

	// t.Log(r)
}

func Test_Create_DuplicateUserError(t *testing.T) {
	beforeEach()
	if _, e := createTestUser(); e != nil {
		t.Fatal(e)
	}
	defer afterEach()

	_, e := test.BlazerxdClient.Create(context.TODO(), &blazerxd_pb.CreateRequest{
		Email:    testUser.Email,
		Password: testUser.Password,
	})
	if e != nil {
		if !strings.Contains(e.Error(), "AlreadyExists") {
			t.Fatal(e)
		}
	} else {
		t.FailNow()
	}
}

func Test_Get_Success(t *testing.T) {
	beforeEach()
	if _, e := createTestUser(); e != nil {
		t.Fatal(e)
	}
	defer afterEach()

	_, e := test.BlazerxdClient.Get(context.TODO(), &blazerxd_pb.GetRequest{
		Email: testUser.Email,
	})
	if e != nil {
		t.Fatal(e)
	}

	// t.Log(r)
}

func Test_Get_UserNotFoundError(t *testing.T) {
	beforeEach()
	defer afterEach()

	_, e := test.BlazerxdClient.Get(context.TODO(), &blazerxd_pb.GetRequest{
		Email: testUser.Email,
	})
	if e != nil {
		if !strings.Contains(e.Error(), "NotFound") {
			t.Fatal(e)
		}
	} else {
		t.Fatal(e)
	}
}

// todo: error case
func Test_ChangePassword_Success(t *testing.T) {
	beforeEach()
	u, e := createTestUser()
	if e != nil {
		t.Fatal(e)
	}
	defer afterEach()

	ud, ee := test.BlazerxdClient.ChangePassword(context.TODO(), &blazerxd_pb.ChangePasswordRequest{
		Id:       u.ID.String(),
		Password: "lol",
	})
	if ee != nil {
		t.Fatal(ee)
	}
	if ud.User.Password != "lol" {
		t.Fatalf("expected %s, got %s", "lol", ud.User.Password)
	}
}
