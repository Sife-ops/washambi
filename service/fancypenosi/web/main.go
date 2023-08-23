// sources:
// https://philipptanlak.com/web-frontends-in-go/#rendering-html-with-go
// https://github.com/philippta/web-frontend-demo/blob/master/html/html.go
// https://old.reddit.com/r/golang/comments/mpdam2/problems_serving_static_files_using/gua4s74/

package web

import (
	"embed"
	"html/template"
	"io"
	"strings"
)

//go:embed page static script
var Embed embed.FS

var funcs = template.FuncMap{
	"uppercase": func(s string) string {
		return strings.ToUpper(s)
	},
}

func parse(f string) *template.Template {
	return template.Must(template.New("page.html").Funcs(funcs).ParseFS(Embed, "page/page.html", f))
}

var (
	foo    = parse("page/foo.html")
	SignUp = parse("page/sign-up.html")
)

func Foo(w io.Writer) error {
	return foo.Execute(w, nil)
}

// func SignUp(w io.Writer) error {
//     return signUp.Execute(w, nil)
// }
