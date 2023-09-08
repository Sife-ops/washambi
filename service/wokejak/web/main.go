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

