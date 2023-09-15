package partial

import (
    "html/template"
    "fmt"
	"net/http"

	"fancypenosi/web"
	"washambi-lib/mid"
	"washambi-lib/env"
)

func Navigator(w http.ResponseWriter, r *http.Request) {
    t := template.Must(
		template.New("navigator").ParseFS(web.Fs, "partial/navigator.html"),
	)

    fmt.Println(r.Context().Value("auth"))
	t.Execute(w, env.WithUrls(map[string]interface{}{
        "auth": r.Context().Value("auth").(mid.AuthCtx),
    }))
}
