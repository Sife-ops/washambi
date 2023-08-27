package router

import (
	"net/http"
	"os"

	"wokejak/web"
)

func Root(w http.ResponseWriter, r *http.Request) {
	cornpopUrl, _ := os.LookupEnv("WASHAMBI_CORNPOP_URL")

	web.Parse("page/root.html").Execute(w, map[string]string{
		"cornpopUrl": cornpopUrl,
	})
}
