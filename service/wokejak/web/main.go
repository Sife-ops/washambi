package web

import (
	"bcoli"
	"embed"
)

//go:embed page public
var Fs embed.FS

var Parser = &web.Parser{
	FS: Fs,
}

// package web
//
// import (
// 	"embed"
// 	"html/template"
// )
//
// //go:embed page public
// var Embeds embed.FS
//
// func Parse(files ...string) *template.Template {
// 	t := template.Must(template.New("template.html").ParseFS(Embeds, "page/template.html"))
// 	for _, f := range files {
// 		t = template.Must(t.ParseFS(Embeds, f))
// 	}
// 	return t
// }
//
