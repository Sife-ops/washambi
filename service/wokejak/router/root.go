package router

import (
	"fmt"
	"html/template"
	"net/http"
	"strings"
	"wokejak/web"
    "washambi-env"
)

func Root(w http.ResponseWriter, r *http.Request) {
	variant := "desktop"
	if m := strings.Contains(r.Header.Get("User-Agent"), "Mobile"); m {
		variant = "mobile"
	}

	template.Must(
		template.
			New("template.html").
			ParseFS(
				web.Fs,
				"page/template.html",
				fmt.Sprintf("page/%s.html", variant),
			)).
		Execute(w, env.WithUrls(map[string]interface{}{
			"styles": []string{variant},
		}))
}
