package page

import (
	"fancypenosi/web"
	"net/http"
	"os"
)

func (p *PageRouter) Foo(w http.ResponseWriter, r *http.Request) {
	web.Foo.Execute(os.Stdout, map[string]interface{}{
		"scripts": []map[string]interface{}{
			{
				"type": "module",
				"path": "/foo/bar",
			},
			{
				"path": "/foo/buz",
			},
		},
		"styles": []string{"sign-in"},
	})

	web.Foo.Execute(w, nil)
}
