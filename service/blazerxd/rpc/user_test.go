package rpc

import (
	"context"
	"os"
	"strings"
	"testing"

	blazerxd_pb "washambi-lib/rpc/blazerxd/v1"
	"washambi-lib/rpc/client"
	"washambi-lib/rpc/test"
)

func TestMain(m *testing.M) {
	// before all

	code := m.Run()

	// after all
	os.Exit(code)
}

func beforeEach() {
	test.DeleteUser()
}

func afterEach(t *testing.T) {
    if e := test.DeleteUser(); e != nil {
        t.Fatal(e)
    }
}

func Test_Create_Success(t *testing.T) {
	beforeEach()
	defer afterEach(t)

	_, e := client.BlazerxdClient.Create(context.TODO(), &blazerxd_pb.CreateRequest{
		Username: test.User.Username,
		Password: test.User.Password,
		// RecoveryPrompt1: test.User.RecoveryPrompt1,
		// RecoveryPrompt2: test.User.RecoveryPrompt2,
		// RecoveryPrompt3: test.User.RecoveryPrompt3,
		// RecoveryAnswer1: test.User.RecoveryAnswer1,
		// RecoveryAnswer2: test.User.RecoveryAnswer2,
		// RecoveryAnswer3: test.User.RecoveryAnswer3,
	})
	if e != nil {
		t.Fatal(e)
	}

	// t.Log(r)
}

func Test_Create_DuplicateUserError(t *testing.T) {
	beforeEach()
	if _, e := test.CreateUser(); e != nil {
		t.Fatal(e)
	}
	defer afterEach(t)

	_, e := client.BlazerxdClient.Create(context.TODO(), &blazerxd_pb.CreateRequest{
		Username: test.User.Username,
		Password: test.User.Password,
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
	_, e := test.CreateUser()
	if e != nil {
		t.Fatal(e)
	}
	// t.Log(tu)
	defer afterEach(t)

	_, ee := client.BlazerxdClient.Get(context.TODO(), &blazerxd_pb.GetRequest{
		Username: test.User.Username,
	})
	// t.Log(u)
	if ee != nil {
		t.Fatal(ee)
	}
	// t.Log(r)
}

func Test_Get_UserNotFoundError(t *testing.T) {
	beforeEach()
	defer afterEach(t)

	_, e := client.BlazerxdClient.Get(context.TODO(), &blazerxd_pb.GetRequest{
		Username: test.User.Username,
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
	u, e := test.CreateUser()
	if e != nil {
		t.Fatal(e)
	}
	defer afterEach(t)

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
