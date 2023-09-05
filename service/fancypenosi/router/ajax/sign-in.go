package ajax

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"

	"fancypenosi/rpc"
	blazerxd_pb "washambi-rpc/blazerxd/v1"

	"golang.org/x/crypto/bcrypt"
)

type signInReq struct {
	Email    string
	Password string
}

func SignIn(w http.ResponseWriter, r *http.Request) {
	var b signUpReq
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

	if e := bcrypt.CompareHashAndPassword([]byte(u.User.Password), []byte(b.Password)); e != nil {
		http.Error(w, "incorrect password", http.StatusUnauthorized)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:  "id",
		Value: u.User.Id,

		Secure:   true,
		HttpOnly: true,
		MaxAge:   10,
		SameSite: http.SameSiteStrictMode,
	})
}
