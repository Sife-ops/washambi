package env

import (
	"log"
	"os"
)

func LookupEnvOrPanic(s string) string {
	v, d := os.LookupEnv(s)
	if !d || v == "" {
		log.Fatalf("environment variable not set: %s", s)
	}
	return v
}

var (
	PgDatabase = LookupEnvOrPanic("WASHAMBI_PG_DATABASE")
	PgHost     = LookupEnvOrPanic("WASHAMBI_PG_HOST")
	PgUser     = LookupEnvOrPanic("WASHAMBI_PG_USER")
	PgPassword = LookupEnvOrPanic("WASHAMBI_PG_PASSWORD")
	PgPort     = LookupEnvOrPanic("WASHAMBI_PG_PORT")

	BlazerxdPort = LookupEnvOrPanic("WASHAMBI_BLAZERXD_PORT")
	BlazerxdUrl  = LookupEnvOrPanic("WASHAMBI_BLAZERXD_URL")

	LaboofPort = LookupEnvOrPanic("WASHAMBI_LABOOF_PORT")
	LaboofUrl  = LookupEnvOrPanic("WASHAMBI_LABOOF_URL")

	AufhebenPort = LookupEnvOrPanic("WASHAMBI_AUFHEBEN_PORT")
	AufhebenUrl  = LookupEnvOrPanic("WASHAMBI_AUFHEBEN_URL")

	CornpopPort = LookupEnvOrPanic("WASHAMBI_CORNPOP_PORT")
	CornpopUrl  = LookupEnvOrPanic("WASHAMBI_CORNPOP_URL")

	FancypenosiPort           = LookupEnvOrPanic("WASHAMBI_FANCYPENOSI_PORT")
	FancypenosiUrl            = LookupEnvOrPanic("WASHAMBI_FANCYPENOSI_URL")
	FancypenosiCookieRotation = LookupEnvOrPanic("WASHAMBI_FANCYPENOSI_COOKIE_ROTATION")
	FancypenosiCookieMaxage   = LookupEnvOrPanic("WASHAMBI_FANCYPENOSI_COOKIE_MAXAGE")

	WokejakPort = LookupEnvOrPanic("WASHAMBI_WOKEJAK_PORT")
	WokejakUrl  = LookupEnvOrPanic("WASHAMBI_WOKEJAK_URL")

	ElonbustPort = LookupEnvOrPanic("WASHAMBI_ELONBUST_PORT")
	ElonbustUrl  = LookupEnvOrPanic("WASHAMBI_ELONBUST_URL")

	BrynhildrPort = LookupEnvOrPanic("WASHAMBI_BRYNHILDR_PORT")
	BrynhildrUrl  = LookupEnvOrPanic("WASHAMBI_BRYNHILDR_URL")

	Urls = map[string]interface{}{
		"blazerxdUrl":    BlazerxdUrl,
		"cornpopUrl":     CornpopUrl,
		"fancypenosiUrl": FancypenosiUrl,
		"wokejakUrl":     WokejakUrl,
		"elonbustUrl":    ElonbustUrl,
		"brynhildrUrl":   BrynhildrUrl,
	}
)

func WithUrls(m map[string]interface{}) map[string]interface{} {
	u := map[string]interface{}{}
	for k, v := range Urls {
		u[k] = v
	}
	if m != nil {
		for k, v := range m {
			u[k] = v
		}
	}
	return u
}
