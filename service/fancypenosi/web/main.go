package web

import (
	"bcoli/web"
	"embed"
)

//go:embed page partial public
var Fs embed.FS

var Parser = &web.Parser{
	FS: Fs,
}

