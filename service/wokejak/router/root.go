package router

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"wokejak/web"
)

func Root(w http.ResponseWriter, r *http.Request) {
	variant := "desktop"
	if m := strings.Contains(r.Header.Get("User-Agent"), "Mobile"); m {
		variant = "mobile"
	}

	web.Parse(fmt.Sprintf("page/%s.html", variant)).Execute(w, map[string]interface{}{
		"cornpopUrl": os.Getenv("WASHAMBI_CORNPOP_URL"),
		"styles":     []string{variant},
	})
}
