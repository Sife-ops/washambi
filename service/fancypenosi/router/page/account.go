package page

import (
	"log"
	"net/http"
	"os"

	"fancypenosi/web"
)

func Account(w http.ResponseWriter, r *http.Request) {
	fancyPenosiUrl, defined := os.LookupEnv("WASHAMBI_FANCYPENOSI_URL")
	if fancyPenosiUrl == "" || !defined {
		log.Fatal("environment variable not set: WASHAMBI_FANCYPENOSI_URL")
	}

	web.
		ParsePage("page/account.html").
		Execute(w, map[string]interface{}{
			"fancyPenosiUrl": fancyPenosiUrl,
		})
}
