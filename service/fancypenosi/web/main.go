// sources:
// https://philipptanlak.com/web-frontends-in-go/#rendering-html-with-go
// https://github.com/philippta/web-frontend-demo/blob/master/html/html.go

package web

import (
	"embed"
	"html/template"
	"io"
	"strings"
)

//go:embed *
var files embed.FS

var funcs = template.FuncMap{
	"uppercase": func(s string) string {
		return strings.ToUpper(s)
	},
}

func parse(f string) *template.Template {
	return template.Must(template.New("page.html").Funcs(funcs).ParseFS(files, "page/page.html", f))
}

var (
	foo = parse("page/foo.html")
    SignUp = parse("page/sign-up.html")
)

func Foo(w io.Writer) error {
	return foo.Execute(w, nil)
}

// func SignUp(w io.Writer) error {
//     return signUp.Execute(w, nil)
// }
