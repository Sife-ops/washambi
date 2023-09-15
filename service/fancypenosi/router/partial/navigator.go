package partial

import (
    "html/template"
	"net/http"

	"fancypenosi/web"
	"washambi-lib/mid"
	"washambi-lib/env"
)

func Navigator(w http.ResponseWriter, r *http.Request) {
    t := template.Must(
		template.New("navigator").ParseFS(web.Fs, "partial/navigator.html"),
	)

	t.Execute(w, env.WithUrls(map[string]interface{}{
        "auth": r.Context().Value("auth").(mid.AuthCtx),
    }))
}
