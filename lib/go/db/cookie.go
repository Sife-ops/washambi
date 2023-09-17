package db

import (
	. "github.com/go-jet/jet/v2/postgres"
	"github.com/gorilla/securecookie"

	zm "washambi-lib/db/zoomers/model"
	zt "washambi-lib/db/zoomers/table"
)

func CookieKeysLatest() (*securecookie.SecureCookie, error) {
	var c []zm.Cookie
	if e := SELECT(zt.Cookie.AllColumns).
		FROM(zt.Cookie).
		ORDER_BY(zt.Cookie.CreatedAt.DESC()).
		LIMIT(1).
		Query(PgConn, &c); e != nil {
		return nil, e
	}
	return securecookie.New(c[0].HashKey, c[0].BlockKey), nil
}

func CookieKeys() ([]*securecookie.SecureCookie, error) {
	var c []zm.Cookie
	if e := SELECT(zt.Cookie.AllColumns).
		FROM(zt.Cookie).
		ORDER_BY(zt.Cookie.CreatedAt.DESC()).
		LIMIT(3).
		Query(PgConn, &c); e != nil {
		return nil, e
	}
	var d []*securecookie.SecureCookie
	for _, b := range c {
		d = append(d, securecookie.New(b.HashKey, b.BlockKey))
	}
	return d, nil
}

func CookieKeysNew() error {
	if _, e := zt.Cookie.INSERT(
		zt.Cookie.HashKey,
		zt.Cookie.BlockKey,
	).
		VALUES(
			securecookie.GenerateRandomKey(64),
			securecookie.GenerateRandomKey(32),
		).
		Exec(PgConn); e != nil {
		return e
	}
	return nil
}
