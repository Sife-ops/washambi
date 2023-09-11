package web

import (
	"washambi-lib/web"
	"embed"
)

//go:embed page public
var Fs embed.FS

var Parser = &web.Parser{
	FS: Fs,
}
