// sources:
// https://philipptanlak.com/web-frontends-in-go/#rendering-html-with-go
// https://github.com/philippta/web-frontend-demo/blob/master/html/html.go
// https://old.reddit.com/r/golang/comments/mpdam2/problems_serving_static_files_using/gua4s74/
// https://www.youtube.com/watch?v=k5wJv4XO7a0

package web

import (
	"embed"
	"html/template"
	"strings"
)

//go:embed page partial public
var Embeds embed.FS

var funcs = template.FuncMap{
	"uppercase": func(s string) string {
		return strings.ToUpper(s)
	},
}

func Parse(files ...string) *template.Template {
	t := template.Must(
		template.New("template.html").
			Funcs(funcs).
			ParseFS(Embeds, "page/template.html"),
	)
	for _, f := range files {
		t = template.Must(t.ParseFS(Embeds, f))
	}
	return t
}
