package router

import (
	// "log"
	"fmt"
	"net/http"
	"os"
	"strings"

	"wokejak/web"
)

func Root(w http.ResponseWriter, r *http.Request) {
	cornpopUrl, _ := os.LookupEnv("WASHAMBI_CORNPOP_URL")

	variant := "desktop"
	if m := strings.Contains(r.Header.Get("User-Agent"), "Mobile"); m {
		variant = "mobile"
	}

	web.Parse(fmt.Sprintf("page/%s.html", variant)).Execute(w, map[string]interface{}{
		"cornpopUrl": cornpopUrl,
		"styles":     []string{variant},
	})
}
