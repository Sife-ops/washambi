package db

import (
	"testing"

	"github.com/gorilla/securecookie"

	zm "washambi-lib/db/zoomers/model"
	zt "washambi-lib/db/zoomers/table"
)

func beforeEach(t *testing.T) {
	for i := 0; i < 10; i++ {
		if _, e := zt.Cookie.INSERT(
			zt.Cookie.HashKey,
			zt.Cookie.BlockKey,
		).
			VALUES(
				securecookie.GenerateRandomKey(64),
				securecookie.GenerateRandomKey(32),
			).
			Exec(Connection); e != nil {
			t.Log(e)
			t.FailNow()
		}
	}
}

func afterEach() {
	zt.Cookie.DELETE().
		WHERE(zt.Cookie.ID.IS_NOT_NULL()).
		Exec(Connection)
}

func Test_CookieIO(t *testing.T) {
	defer afterEach()

	a := securecookie.GenerateRandomKey(64)
	var c []zm.Cookie
	if e := zt.Cookie.INSERT(
		zt.Cookie.HashKey,
		zt.Cookie.BlockKey,
	).
		VALUES(
			a,
			securecookie.GenerateRandomKey(32),
		).
		RETURNING(zt.Cookie.AllColumns).
		Query(Connection, &c); e != nil {
		t.FailNow()
	}

	if string(a) != string(c[0].HashKey) {
		t.FailNow()
	}
}

func Test_CookieKeysLatest(t *testing.T) {
	beforeEach(t)
	defer afterEach()

	_, e := CookieKeysLatest()
	if e != nil {
		t.FailNow()
	}
    // t.Log(a)
}

func Test_CookieKeys(t *testing.T) {
	beforeEach(t)
	defer afterEach()

    a, e := CookieKeys()
    if e != nil {
        t.FailNow()
    }
    if len(a) != 3 {
        t.FailNow()
    }
}

func Test_CookieKeysNew(t *testing.T) {
	beforeEach(t)
	defer afterEach()

    if e := CookieKeysNew(); e != nil {
        t.FailNow()
    }
}
