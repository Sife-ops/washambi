package web

import (
	"embed"
	"fmt"
	"html/template"
	"strings"
)

type Parser struct {
	embed.FS
}

var funcs = template.FuncMap{
	"uppercase": func(s string) string {
		return strings.ToUpper(s)
	},
}

func (l *Parser) Parse(tmpl string, file string, files ...string) *template.Template {
	t := template.Must(
		template.New(tmpl).
			Funcs(funcs).
			ParseFS(l.FS, file),
	)
	for _, f := range files {
		t = template.Must(t.ParseFS(l.FS, f))
	}
	return t
}

func (l *Parser) ParsePage(files ...string) *template.Template {
	return l.Parse("template.html", "page/template.html", files...)
}

func (l *Parser) ParsePartial(tmpl string, files ...string) *template.Template {
	return l.Parse(
		fmt.Sprintf("%s.html", tmpl),
		fmt.Sprintf("partial/%s.html", tmpl),
		files...,
	)
}
