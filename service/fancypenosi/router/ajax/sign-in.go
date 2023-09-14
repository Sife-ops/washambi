package ajax

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"

	"github.com/gorilla/securecookie"
	"golang.org/x/crypto/bcrypt"

	"fancypenosi/rpc"
	"washambi-lib/mid"
	blazerxd_pb "washambi-lib/rpc/blazerxd/v1"
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

	u, e := rpc.BlazerxdClient.Get(context.TODO(), &blazerxd_pb.GetRequest{
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

	if enc, e := securecookie.EncodeMulti("a", map[string]string{
		"id":       u.User.Id,
		"username": u.User.Username,
	}, mid.Cookies["current"]); e != nil {
		http.Error(w, "cookie", http.StatusInternalServerError)
		return
	} else {
		http.SetCookie(w, &http.Cookie{
			Name:     "a",
			Value:    enc,
			Secure:   true,
			HttpOnly: true,
			MaxAge:   1200,
			SameSite: http.SameSiteStrictMode,
		})
	}
}
