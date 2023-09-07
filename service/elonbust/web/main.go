package web

import (
	"bcoli"
	"embed"
)

//go:embed page
var fs embed.FS

var Parser = &web.Parser{
	FS: fs,
}
