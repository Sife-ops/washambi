package ajax

import (
	"context"
	"encoding/json"
	// "log"
	"net/http"
	"net/mail"
	"strings"

	"fancypenosi/rpc"
	blazerxd_pb "washambi-rpc/blazerxd/v1"
)

type signUpReq struct {
	Email    string
	Password string
}

func SignUp(w http.ResponseWriter, r *http.Request) {
	// log.Println("debug")
	// w.Header().Add("lmao", "ok")

	var b signUpReq
	if e := json.NewDecoder(r.Body).Decode(&b); e != nil {
		http.Error(w, "JSON unmarshal", http.StatusBadRequest)
		return
	}

	if _, e := mail.ParseAddress(b.Email); e != nil {
		http.Error(w, "invalid email", http.StatusBadRequest)
		return
	}

	if len(b.Password) < 8 || len(b.Password) > 32 {
		http.Error(w, "password length", http.StatusBadRequest)
		return
	}

	if _, e := rpc.BlazerxdClient.Create(context.TODO(), &blazerxd_pb.CreateRequest{
		Email:    b.Email,
		Password: b.Password,
	}); e != nil {
		if strings.Contains(e.Error(), "AlreadyExists") {
			http.Error(w, "already exists", http.StatusConflict)
		} else {
			http.Error(w, "unknown", http.StatusInternalServerError)
		}
	}
}
