package rpc

import (
	"context"
	"os"
	"strings"
	"testing"

	zm "washambi-lib/db/zoomers/model"
	"washambi-lib/rpc/client"
	laboof_pb "washambi-lib/rpc/laboof/v1"
	"washambi-lib/rpc/test"
)

func TestMain(m *testing.M) {
	// before all

	code := m.Run()

	// after all
	os.Exit(code)
}

var testUser *zm.User

func beforeEach(t *testing.T) {
	test.DeleteUser()
	test.DeleteKanban()

	u, e := test.CreateUser()
	if e != nil {
		t.Fatal(e)
	}
	testUser = u
}

func afterEach(t *testing.T) {
	if e := test.DeleteUser(); e != nil {
		t.Fatal(e)
	}
	if e := test.DeleteKanban(); e != nil {
		t.Fatal(e)
	}
}

func Test_KanbanCreate_Success(t *testing.T) {
	beforeEach(t)
	defer afterEach(t)

	_, e := client.LaboofClient.KanbanCreate(context.TODO(), &laboof_pb.KanbanCreateRequest{
		Name:   test.Kanban.Name,
		UserId: testUser.ID.String(),
	})
	if e != nil {
		t.Fatal(e)
	}
}

func Test_KanbanCreate_DuplicateKanbanError(t *testing.T) {
	beforeEach(t)
	defer afterEach(t)

	if _, e := test.CreateKanban(testUser); e != nil {
		t.Fatal(e)
	}
	_, e := client.LaboofClient.KanbanCreate(context.TODO(), &laboof_pb.KanbanCreateRequest{
		Name:   test.Kanban.Name,
		UserId: testUser.ID.String(),
	})
	if e != nil {
		if !strings.Contains(e.Error(), "AlreadyExists") {
			t.Fatal(e)
		}
	} else {
		t.FailNow()
	}
}

func Test_KanbanList_Success(t *testing.T) {
	beforeEach(t)
	test.CreateKanban(testUser)
	defer afterEach(t)

	_, e := client.LaboofClient.KanbanList(context.TODO(), &laboof_pb.KanbanListRequest{
		UserId: testUser.ID.String(),
	})
	if e != nil {
		t.Log(e)
	}
}
