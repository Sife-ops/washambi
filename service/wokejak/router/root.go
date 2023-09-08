package router

import (
	"fmt"
	"net/http"
	"strings"
	"washambi-env"
	"wokejak/web"
)

func Root(w http.ResponseWriter, r *http.Request) {
	variant := "desktop"
	if m := strings.Contains(r.Header.Get("User-Agent"), "Mobile"); m {
		variant = "mobile"
	}

	web.
		Parser.
		ParsePage(fmt.Sprintf("page/%s.html", variant)).
		Execute(w, env.WithEnv(map[string]interface{}{
			"styles": []string{variant},
		}))
}
