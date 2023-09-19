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
	"time"

	"google.golang.org/protobuf/types/known/timestamppb"
)

//go:embed page
var Fs embed.FS

type Parser struct {
	embed.FS
}

var Funcs = template.FuncMap{
	"uppercase": func(s string) string {
		return strings.ToUpper(s)
	},
	"asUrl": func(s *string) template.URL {
		return template.URL(*s)
	},
	"asTime": func(t *timestamppb.Timestamp) time.Time {
		return t.AsTime()
	},
	"asRfc822": func(t time.Time) string {
		return t.Format(time.RFC822)
	},
}

func (p *Parser) Parse(tmpl string, files ...string) *template.Template {
	return template.Must(
		template.New(tmpl).
			Funcs(Funcs).
			ParseFS(p.FS, files...),
	)
}

var Common = Parser{Fs}
