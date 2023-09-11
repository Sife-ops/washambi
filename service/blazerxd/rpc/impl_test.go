package rpc

import (
	"context"
	"os"
	"strings"
	"testing"

	zm "blazerxd/db/zoomers/model"
	zt "blazerxd/db/zoomers/table"
    "washambi-lib/rpc/client"
	"washambi-lib/db"
	blazerxd_pb "washambi-lib/rpc/blazerxd/v1"

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
	Username:        "69blazer420",
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
			testUser.Username,
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
	stmt := zt.User.DELETE().WHERE(zt.User.Username.EQ(String(testUser.Username)))
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

	_, e := client.BlazerxdClient.Create(context.TODO(), &blazerxd_pb.CreateRequest{
		Username: testUser.Username,
		Password: testUser.Password,
		// RecoveryPrompt1: testUser.RecoveryPrompt1,
		// RecoveryPrompt2: testUser.RecoveryPrompt2,
		// RecoveryPrompt3: testUser.RecoveryPrompt3,
		// RecoveryAnswer1: testUser.RecoveryAnswer1,
		// RecoveryAnswer2: testUser.RecoveryAnswer2,
		// RecoveryAnswer3: testUser.RecoveryAnswer3,
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

	_, e := client.BlazerxdClient.Create(context.TODO(), &blazerxd_pb.CreateRequest{
		Username: testUser.Username,
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
	_, e := createTestUser()
	if e != nil {
		t.Fatal(e)
	}
	// t.Log(tu)
	defer afterEach()

	_, ee := client.BlazerxdClient.Get(context.TODO(), &blazerxd_pb.GetRequest{
		Username: testUser.Username,
	})
	// t.Log(u)
	if ee != nil {
		t.Fatal(ee)
	}
	// t.Log(r)
}

func Test_Get_UserNotFoundError(t *testing.T) {
	beforeEach()
	defer afterEach()

	_, e := client.BlazerxdClient.Get(context.TODO(), &blazerxd_pb.GetRequest{
		Username: testUser.Username,
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

	p := "lol"
	ud, ee := client.BlazerxdClient.ChangePassword(context.TODO(), &blazerxd_pb.ChangePasswordRequest{
		Id:       u.ID.String(),
		Password: p,
	})
	if ee != nil {
		t.Fatal(ee)
	}
	if ud.User.Password != "lol" {
		t.Fatalf("expected %s, got %s", p, ud.User.Password)
	}
}
