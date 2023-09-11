package ajax

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"

	"golang.org/x/crypto/bcrypt"

	"fancypenosi/rpc"
	blazerxd_pb "washambi-lib/rpc/blazerxd/v1"
)

type signUpReq struct {
	Username        string
	Password        string
	RecoveryPrompt1 string
	RecoveryPrompt2 string
	RecoveryPrompt3 string
	RecoveryAnswer1 string
	RecoveryAnswer2 string
	RecoveryAnswer3 string
}

func SignUp(w http.ResponseWriter, r *http.Request) {
	var b signUpReq
	if e := json.NewDecoder(r.Body).Decode(&b); e != nil {
		http.Error(w, "JSON unmarshal", http.StatusBadRequest)
		return
	}

	if len(b.Username) < 8 || len(b.Username) > 32 {
		http.Error(w, "username length", http.StatusBadRequest)
		return
	}

	if len(b.Password) < 8 || len(b.Password) > 32 {
		http.Error(w, "password length", http.StatusBadRequest)
		return
	}

	h, e := bcrypt.GenerateFromPassword([]byte(b.Password), 0) // default to 10
	if e != nil {
		http.Error(w, "password hash", http.StatusInternalServerError)
		return
	}

	if len(b.RecoveryAnswer1) < 1 || len(b.RecoveryAnswer2) < 1 || len(b.RecoveryAnswer3) < 1 {
		http.Error(w, "recovery answer length", http.StatusBadRequest)
		return
	}

	if _, e := rpc.BlazerxdClient.Create(context.TODO(), &blazerxd_pb.CreateRequest{
		Username:        b.Username,
		Password:        string(h),
		RecoveryPrompt1: b.RecoveryPrompt1,
		RecoveryPrompt2: b.RecoveryPrompt2,
		RecoveryPrompt3: b.RecoveryPrompt3,
		RecoveryAnswer1: b.RecoveryAnswer1,
		RecoveryAnswer2: b.RecoveryAnswer2,
		RecoveryAnswer3: b.RecoveryAnswer3,
	}); e != nil {
		if strings.Contains(e.Error(), "AlreadyExists") {
			http.Error(w, "already exists", http.StatusConflict)
		} else {
			http.Error(w, "unknown", http.StatusInternalServerError)
		}
	}
}
