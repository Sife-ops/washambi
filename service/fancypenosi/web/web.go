package web

import (
	"embed"
	"html/template"
	"io"
	// "strings"
)

//go:embed *
var files embed.FS

// var funcs = template.FuncMap{
// 	"uppercase": func(s string) string {
// 		return strings.ToUpper(s)
// 	},
// }

func parse(f string) *template.Template {
	// template.Fu
	return template.Must(template.New("layout.html").ParseFS(files, "layout.html", f))
	// return template.Must(template.New("layout.html").F)
}

var (
	foo = parse("foo.html")
)

func Foo(w io.Writer) error {
	return foo.Execute(w, nil)
}
