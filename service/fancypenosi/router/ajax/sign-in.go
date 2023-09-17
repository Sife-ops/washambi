package ajax

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"

	"golang.org/x/crypto/bcrypt"

	"washambi-lib/mid"
	blazerxd_pb "washambi-lib/rpc/blazerxd/v1"
	"washambi-lib/rpc/client"
)

type signInReq struct {
	Username string
	Password string
}

func SignIn(w http.ResponseWriter, r *http.Request) {
	var b signInReq
	if e := json.NewDecoder(r.Body).Decode(&b); e != nil {
		http.Error(w, "JSON unmarshal", http.StatusBadRequest)
		return
	}

	u, e := client.BlazerxdClient.Get(context.TODO(), &blazerxd_pb.GetRequest{
		Username: b.Username,
	})
	if e != nil {
		if strings.Contains(e.Error(), "NotFound") {
			http.Error(w, "not found", http.StatusNotFound)
		} else {
			http.Error(w, "unknown", http.StatusInternalServerError)
		}
		return
	}

	if e := bcrypt.CompareHashAndPassword([]byte(u.User.Password), []byte(b.Password)); e != nil {
		http.Error(w, "incorrect password", http.StatusUnauthorized)
		return
	}

	mid.AuthCookie(w, mid.AuthClaims{
		Id:       u.User.Id,
		Username: u.User.Username,
	})
}
