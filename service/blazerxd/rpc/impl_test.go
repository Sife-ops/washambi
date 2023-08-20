package rpc

import (
	"context"
	"os"
	"testing"

	"blazerxd/sql"
	"blazerxd/test"
	blazerxd_pb "washambi-rpc/blazerxd/v1"
)

var testClients test.TestClients

func TestMain(m *testing.M) {
	testClients = test.TestClients{
		Db:   sql.PostgresConnection(),
		Grpc: test.NewGrpcClient(),
	}
	os.Exit(m.Run())
}

func TestCreate(t *testing.T) {
	r, e := testClients.Grpc.Create(context.TODO(), &blazerxd_pb.CreateRequest{
		Email:    "asdf",
		Password: "fdsa",
	})
	if e != nil {
		t.Fatal(e)
	}
	t.Log(r)
}
