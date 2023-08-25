package page

import (
	"errors"
	"io/fs"
	"log"
	"math/rand"
	"net/http"
	"regexp"

	"fancypenosi/web"
)

func (p *PageRouter) SignUp(w http.ResponseWriter, r *http.Request) {
	bg, e := randomBg()
	if e != nil {
		log.Println(e)
	}

	web.SignUp.Execute(w, map[string]interface{}{
		"styles": []string{"sign-up"},
		"bg":     bg,
	})
}

func randomBg() (string, error) {
	s, e := fs.Sub(web.Embed, "public/bg")
	if e != nil {
		return "", e
	}

	// can't re-use e???
	var files []string
	ee := fs.WalkDir(s, ".", func(p string, d fs.DirEntry, e error) error {
		m, e := regexp.MatchString("^.*\\.html", p)
		if e != nil {
			return nil
		}
		if m {
			files = append(files, p)
		}
		return nil
	})
	if ee != nil {
		return "", ee
	}

	if len(files) < 1 {
		return "", errors.New("length of files is 0")
	}
	return files[rand.Intn(len(files))], nil
}
