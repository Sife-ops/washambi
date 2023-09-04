// sources:
// https://philipptanlak.com/web-frontends-in-go/#rendering-html-with-go
// https://github.com/philippta/web-frontend-demo/blob/master/html/html.go
// https://old.reddit.com/r/golang/comments/mpdam2/problems_serving_static_files_using/gua4s74/
// https://www.youtube.com/watch?v=k5wJv4XO7a0

package web

import (
	"embed"
	"fmt"
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

func Parse(tmpl string, file string, files ...string) *template.Template {
	t := template.Must(
		template.New(tmpl).
			Funcs(funcs).
			ParseFS(Embeds, file),
	)
	for _, f := range files {
		t = template.Must(t.ParseFS(Embeds, f))
	}
	return t
}

func ParsePage(files ...string) *template.Template {
	return Parse("template.html", "page/template.html", files...)
}

func ParsePartial(tmpl string, files ...string) *template.Template {
	return Parse(
		fmt.Sprintf("%s.html", tmpl),
		fmt.Sprintf("partial/%s.html", tmpl),
		files...,
	)
}
