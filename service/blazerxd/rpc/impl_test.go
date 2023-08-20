package rpc

import (
	"context"
	"testing"
	blazerxd_pb "washambi-rpc/blazerxd/v1"
)

func TestCreate(t *testing.T) {
	// t.Log("is this ok")
	c := NewClient()
	r, e := c.Create(context.TODO(), &blazerxd_pb.CreateRequest{
		Email:    "asdf",
		Password: "fdsa",
	})
    if e != nil {
        t.Fatal(e)
    }
    t.Log(r)
}
