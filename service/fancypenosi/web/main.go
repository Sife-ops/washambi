package web

import (
	"embed"
	"washambi-lib/web"
)

//go:embed page partial public
var Fs embed.FS

var Parser = &web.Parser{
	FS: Fs,
}
