package router

import (
	"net/http"

	"wokejak/web"
)

func Root(w http.ResponseWriter, r *http.Request) {
	web.Parse("page/root.html").Execute(w, nil)
}
