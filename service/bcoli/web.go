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

//go:embed page
var fs embed.FS

type Parser struct {
	embed.FS
}

var funcs = template.FuncMap{
	"uppercase": func(s string) string {
		return strings.ToUpper(s)
	},
}

func (l *Parser) Parse(fs embed.FS, tmpl string, file string, files ...string) *template.Template {
	t := template.Must(
		template.New(tmpl).
			Funcs(funcs).
			ParseFS(fs, file),
	)
	for _, f := range files {
		t = template.Must(t.ParseFS(l.FS, f))
	}
	return t
}

func (l *Parser) ParsePage(files ...string) *template.Template {
	return l.Parse(fs, "template.html", "page/template.html", files...)
}

func (l *Parser) ParsePartial(tmpl string, files ...string) *template.Template {
	return l.Parse(
		l.FS,
		fmt.Sprintf("%s.html", tmpl),
		fmt.Sprintf("partial/%s.html", tmpl),
		files...,
	)
}
