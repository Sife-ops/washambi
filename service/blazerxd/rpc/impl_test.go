package rpc

import (
	"context"
	"os"
	"strings"
	"testing"

	zt "blazerxd/db/zoomers/table"
	"blazerxd/test"
	blazerxd_pb "washambi-rpc/blazerxd/v1"

	. "github.com/go-jet/jet/v2/postgres"
)

var testClients *test.TestClients

func TestMain(m *testing.M) {
	// before all
	tc, e := test.NewTestClients()
	if e != nil {
		panic(e)
	}
	testClients = tc

	code := m.Run()

	// after all
	os.Exit(code)
}

// move to package test
var testCreateRequest = blazerxd_pb.CreateRequest{
	Email:    "blazer@xd.com",
	Password: "blazerxd",
}

// move to package test
func deleteTestUser() {
	stmt := zt.User.DELETE().WHERE(zt.User.Email.EQ(String(testCreateRequest.Email)))
	stmt.Exec(testClients.Db)
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

	r, e := testClients.Grpc.Create(context.TODO(), &testCreateRequest)
	if e != nil {
		t.Fatal(e)
	}

	t.Log(r)
}

func Test_Create_DuplicateUserError(t *testing.T) {
	beforeEach()
	defer afterEach()

	stmt := zt.User.
		INSERT(zt.User.Email, zt.User.Password).
		VALUES(testCreateRequest.Email, testCreateRequest.Password).
		RETURNING(zt.User.AllColumns)
	if _, e := stmt.Exec(testClients.Db); e != nil {
		t.Fatal(e)
	}

	_, e := testClients.Grpc.Create(context.TODO(), &testCreateRequest)
	if e != nil {
		if !strings.Contains(e.Error(), "AlreadyExists") {
			t.Fatal(e)
		}
	} else {
		t.FailNow()
	}
}
