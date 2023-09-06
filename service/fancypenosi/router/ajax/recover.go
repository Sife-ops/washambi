package ajax

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"

	"fancypenosi/rpc"
	blazerxd_pb "washambi-rpc/blazerxd/v1"
)

type recoverReq struct {
	Email           string
	RecoveryAnswer1 string
	RecoveryAnswer2 string
	RecoveryAnswer3 string
	Password        string
}

func Recover(w http.ResponseWriter, r *http.Request) {
	var b recoverReq
	if e := json.NewDecoder(r.Body).Decode(&b); e != nil {
		http.Error(w, "JSON unmarshal", http.StatusBadRequest)
		return
	}

	u, e := rpc.BlazerxdClient.Get(context.TODO(), &blazerxd_pb.GetRequest{
		Email: b.Email,
	})
	if e != nil {
		if strings.Contains(e.Error(), "NotFound") {
			http.Error(w, "not found", http.StatusNotFound)
		} else {
			http.Error(w, "unknown", http.StatusInternalServerError)
		}
		return
	}

	if b.RecoveryAnswer1 != u.User.RecoveryAnswer1 ||
		b.RecoveryAnswer2 != u.User.RecoveryAnswer2 ||
		b.RecoveryAnswer3 != u.User.RecoveryAnswer3 {
		http.Error(w, "incorrect answer", http.StatusBadRequest)
		return
	}

	if len(b.Password) < 8 || len(b.Password) > 32 {
		http.Error(w, "password length", http.StatusBadRequest)
		return
	}

	if _, e := rpc.BlazerxdClient.ChangePassword(context.TODO(), &blazerxd_pb.ChangePasswordRequest{
		Id:       u.User.Id,
		Password: b.Password,
	}); e != nil {
		http.Error(w, "unknown", http.StatusInternalServerError)
		return
	}
}
