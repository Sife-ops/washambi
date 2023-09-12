package web

import (
	"embed"
	"washambi-lib/web"
)

//go:embed page public partial
var Fs embed.FS

var Parser = &web.Parser{
	FS: Fs,
}
